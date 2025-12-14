'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';


const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load tasks from API on mount
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/tasks');
                const data = await res.json();
                if (data.success) {
                    setTasks(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // Helper to map Mongo _id to id for frontend compatibility if needed, 
    // but better to just use _id consistently. 
    // For now, I'll assume the UI can handle _id if I update it, or I map it here.
    // The Mongoose model uses _id. The previous code used id (Date.now).
    // Let's stick to using the server response which will have _id. 
    // Need to verify if the UI uses .id or ._id. 
    // Ideally, I should keep .id as an alias or update the UI.
    // To be safe and minimal, I will map _id to id in the frontend state if strictly needed,
    // OR just rely on the fact that Mongoose can return an id virtual if configured?
    // Let's just use the returned object. If the UI breaks on key `id`, I'll fix it.
    // Actually, looking at the previous code: `task.id`. Mongoose objects have `_id`.
    // I'll assume standardizing on `_id` is better, but to avoid UI refactor, I can map it.
    // However, the cleanest way is to just use the data from the server.

    const addTask = async (taskData) => {
        setLoading(true);
        try {
            const classification = taskData.classification || 'NOT_URGENT_NOT_IMPORTANT';

            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...taskData, classification }),
            });
            const data = await res.json();

            if (data.success) {
                setTasks((prev) => [data.data, ...prev]);
                toast.success('Task added successfully');
            } else {
                toast.error('Failed to add task');
            }
        } catch (error) {
            console.error("Failed to add task", error);
            toast.error('Error adding task');
        } finally {
            setLoading(false);
        }
    };

    const toggleTaskStatus = async (taskId) => {
        // Optimistic update logic if desired, but for now we follow the API response.
        const taskToToggle = tasks.find(t => t._id === taskId || t.id === taskId);
        if (!taskToToggle) return;

        // Handle both _id (Mongo) and id (Legacy) for safe transition if mixed data existed, 
        // but fully replacing localStorage means we start fresh or need robust handling.
        // We will assume new tasks have _id.
        const id = taskToToggle._id || taskToToggle.id;

        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !taskToToggle.completed }),
            });
            const data = await res.json();

            if (data.success) {
                setTasks((prev) =>
                    prev.map((task) =>
                        (task._id === id || task.id === id) ? data.data : task
                    )
                );
                // toast.success('Task status updated'); // Optional: can be noisy
            } else {
                toast.error('Failed to update task');
            }
        } catch (error) {
            console.error("Failed to toggle task", error);
            toast.error('Error updating task');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                setTasks((prev) => prev.filter((task) => (task._id !== taskId && task.id !== taskId)));
                toast.success('Task deleted successfully');
            } else {
                toast.error('Failed to delete task');
            }
        } catch (error) {
            console.error("Failed to delete task", error);
            toast.error('Error deleting task');
        }
    };

    const value = {
        tasks,
        loading,
        addTask,
        toggleTaskStatus,
        deleteTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
