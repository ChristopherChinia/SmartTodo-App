'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Wand2 } from 'lucide-react';
import { useTasks } from '../store/taskContext';
import { CLASSIFICATION_TYPES, analyzeTask } from '../services/ai';

const TaskForm = ({ isOpen, onClose }) => {
    const { addTask, loading } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    if (!isOpen) return null;

    const handleAiAnalyze = async () => {
        if (!title) return;
        setAiLoading(true);
        const result = await analyzeTask(title, description);
        setAiLoading(false);

        if (result) {
            if (result.classification) {
                setIsUrgent(result.classification.includes('URGENT'));
                setIsImportant(result.classification.includes('IMPORTANT'));
            }
            if (result.suggestedEndTime) {
                setEndTime(result.suggestedEndTime);
                // Set start time to now if empty
                if (!startTime) {
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    setStartTime(`${hours}:${minutes}`);
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        let classification;
        if (isUrgent && isImportant) {
            classification = CLASSIFICATION_TYPES.URGENT_IMPORTANT;
        } else if (!isUrgent && isImportant) {
            classification = CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT;
        } else if (isUrgent && !isImportant) {
            classification = CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT;
        } else {
            classification = CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT;
        }

        await addTask({
            title,
            description,
            startTime,
            endTime,
            classification,
        });

        setTitle('');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setIsUrgent(false);
        setIsImportant(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Sparkles size={20} className="text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">New Task</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Task Title
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="What needs to be done?"
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all pr-12"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={handleAiAnalyze}
                                    disabled={!title || aiLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="AI Analyze"
                                >
                                    {aiLoading ? (
                                        <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                                    ) : (
                                        <Wand2 size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Description / Notes
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add details..."
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isUrgent ? 'bg-red-500 border-red-500' : 'border-gray-600 group-hover:border-red-400'}`}>
                                    {isUrgent && <X size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} className="hidden" />
                                <span className={`text-sm font-medium ${isUrgent ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'}`}>Urgent</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isImportant ? 'bg-blue-500 border-blue-500' : 'border-gray-600 group-hover:border-blue-400'}`}>
                                    {isImportant && <X size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} className="hidden" />
                                <span className={`text-sm font-medium ${isImportant ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`}>Important</span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || !title}
                                className={`
                  w-full py-3 px-4 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25
                  flex items-center justify-center gap-2 transition-all duration-300
                  ${loading || !title
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] active:scale-[0.98]'
                                    }
                `}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        <span>Create Task</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
