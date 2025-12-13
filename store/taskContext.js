'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';


const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load tasks from local storage on mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = async (taskData) => {
        setLoading(true);
        try {
            // Use provided classification or default to 'not_urgent_not_important'
            const classification = taskData.classification || 'not_urgent_not_important';

            const newTask = {
                id: Date.now().toString(),
                ...taskData,
                classification,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            setTasks((prev) => [newTask, ...prev]);
        } catch (error) {
            console.error("Failed to add task", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTaskStatus = (taskId) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
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
