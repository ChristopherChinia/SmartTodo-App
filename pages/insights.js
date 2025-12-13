import React, { useEffect, useState } from 'react';
import { useTasks } from '../store/taskContext';
import { getInsights } from '../services/ai';
import { Sparkles, TrendingUp, BrainCircuit, Loader2 } from 'lucide-react';

export default function Insights() {
    const { tasks } = useTasks();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            const completedTasks = tasks.filter(t => t.completed);
            if (completedTasks.length === 0) {
                setLoading(false);
                return;
            }

            const data = await getInsights(completedTasks);
            setInsights(data);
            setLoading(false);
        };

        fetchInsights();
    }, [tasks]);

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    AI Insights
                </h1>
                <p className="text-gray-400 mt-2">
                    Weekly analysis of your productivity and habits.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <Loader2 size={48} className="animate-spin mb-4 text-purple-500" />
                    <p>Analyzing your productivity patterns...</p>
                </div>
            ) : !insights ? (
                <div className="text-center py-20 text-gray-500 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                    <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Complete some tasks to generate insights!</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Weekly Summary Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <TrendingUp size={24} className="text-blue-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Weekly Summary</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            {insights.weeklySummary}
                        </p>
                    </div>

                    {/* Behavioral Insights Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-500/10 rounded-lg">
                                <BrainCircuit size={24} className="text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Behavioral Insights</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            {insights.behavioralInsights}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
