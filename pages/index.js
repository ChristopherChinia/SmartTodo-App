import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../store/taskContext';

export default function Home() {
    const { tasks } = useTasks();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const activeTasks = tasks.filter(task => !task.completed);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
                    <p className="text-gray-400">
                        You have <span className="text-purple-400 font-semibold">{activeTasks.length}</span> active tasks
                    </p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                    <Plus size={20} className="transition-transform group-hover:rotate-90" />
                    <span>Add Task</span>
                </button>
            </div>

            <TaskList tasks={activeTasks} />

            <TaskForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </div>
    );
}
