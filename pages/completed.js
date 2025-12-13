import React from 'react';
import TaskList from '../components/TaskList';
import { useTasks } from '../store/taskContext';

export default function Completed() {
    const { tasks } = useTasks();

    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Completed Tasks</h1>
                <p className="text-gray-400">
                    You have completed <span className="text-green-400 font-semibold">{completedTasks.length}</span> tasks
                </p>
            </div>

            <TaskList tasks={completedTasks} />
        </div>
    );
}
