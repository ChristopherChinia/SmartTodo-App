'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { CLASSIFICATION_TYPES } from '../services/ai';

const PRIORITY_ORDER = [
    CLASSIFICATION_TYPES.URGENT_IMPORTANT,
    CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT,
    CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT,
    CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT,
];

const TaskList = ({ tasks }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">All caught up!</h3>
                <p className="text-gray-400">No tasks on your list. Enjoy your day.</p>
            </div>
        );
    }

    // Sort tasks by priority order
    const sortedTasks = [...tasks].sort((a, b) => {
        const indexA = PRIORITY_ORDER.indexOf(a.classification);
        const indexB = PRIORITY_ORDER.indexOf(b.classification);
        return indexA - indexB;
    });

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {sortedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
