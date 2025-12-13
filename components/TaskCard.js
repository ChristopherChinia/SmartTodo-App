'use client';

import React from 'react';
import { format } from 'date-fns';
import { Check, Clock, Calendar, Trash2 } from 'lucide-react';
import { CLASSIFICATION_LABELS, CLASSIFICATION_COLORS } from '../services/ai';
import { useTasks } from '../store/taskContext';

const TaskCard = ({ task }) => {
    const { toggleTaskStatus, deleteTask } = useTasks();

    const classificationColor = CLASSIFICATION_COLORS[task.classification] || 'bg-gray-500';
    const classificationLabel = CLASSIFICATION_LABELS[task.classification] || 'Unclassified';

    const handleCardClick = () => {
        if (!task.startTime || !task.endTime) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;

        // Helper to convert HH:MM to HHMM00
        const formatTime = (timeStr) => timeStr.replace(':', '') + '00';

        const startDateTime = `${dateStr}T${formatTime(task.startTime)}`;
        const endDateTime = `${dateStr}T${formatTime(task.endTime)}`;

        const details = encodeURIComponent(task.description || '');
        const title = encodeURIComponent(task.title || task.description || 'Task');

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDateTime}/${endDateTime}`;

        window.open(url, '_blank');
    };

    return (
        <div
            onClick={handleCardClick}
            className={`
                group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 
                hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5
                ${(task.startTime && task.endTime) ? 'cursor-pointer hover:bg-gray-800/80' : ''}
            `}
        >
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl overflow-hidden">
                <div className={`w-full h-full ${classificationColor}`}></div>
            </div>

            <div className="flex items-start gap-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskStatus(task.id);
                    }}
                    className={`
            mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-500 text-transparent hover:border-purple-400'
                        }
          `}
                >
                    <Check size={14} strokeWidth={3} />
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50`}>
                            {classificationLabel}
                        </span>
                        <div className="flex items-center gap-2">
                            {task.createdAt && (
                                <span className="text-xs text-gray-500">
                                    Created {format(new Date(task.createdAt), 'MMM d')}
                                </span>
                            )}
                            {task.completed && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTask(task.id);
                                    }}
                                    className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-gray-700/50"
                                    title="Delete Task"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <h3 className={`text-lg font-semibold text-white mb-1 truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title || task.description}
                    </h3>

                    {task.description && task.title && (
                        <p className={`text-sm text-gray-400 mb-3 line-clamp-2 ${task.completed ? 'text-gray-600' : ''}`}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        {task.startTime && (
                            <div className="flex items-center gap-1.5 bg-gray-800 px-2 py-1 rounded-md border border-gray-700/50">
                                <Clock size={14} className="text-purple-400" />
                                <span>{task.startTime}</span>
                            </div>
                        )}
                        {task.endTime && (
                            <div className="flex items-center gap-1.5 bg-gray-800 px-2 py-1 rounded-md border border-gray-700/50">
                                <span className="text-gray-600">-</span>
                                <span className="text-gray-600">{task.endTime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
