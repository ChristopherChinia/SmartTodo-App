/**
 * Constants for Task Classification
 * Kept for UI consistency after removing AI logic.
 */



export const CLASSIFICATION_TYPES = {
    URGENT_IMPORTANT: 'URGENT_IMPORTANT',
    URGENT_NOT_IMPORTANT: 'URGENT_NOT_IMPORTANT',
    NOT_URGENT_IMPORTANT: 'NOT_URGENT_IMPORTANT',
    NOT_URGENT_NOT_IMPORTANT: 'NOT_URGENT_NOT_IMPORTANT',
};

export const CLASSIFICATION_LABELS = {
    [CLASSIFICATION_TYPES.URGENT_IMPORTANT]: 'Do First',
    [CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT]: 'Delegate',
    [CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT]: 'Schedule',
    [CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT]: 'Delete',
};

export const CLASSIFICATION_COLORS = {
    [CLASSIFICATION_TYPES.URGENT_IMPORTANT]: 'bg-red-500',
    [CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT]: 'bg-yellow-500',
    [CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT]: 'bg-blue-500',
    [CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT]: 'bg-gray-500',
};

export async function analyzeTask(title, description) {
    try {
        const response = await fetch('/api/ai/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                currentDate: new Date().toISOString()
            }),
        });

        if (!response.ok) throw new Error('Failed to analyze task');
        return await response.json();
    } catch (error) {
        console.error('AI Analysis Error:', error);
        return null;
    }
}

export async function getInsights(completedTasks) {
    try {
        // Prepare data for AI: ensure only necessary fields are sent and formatted
        const sanitizedTasks = completedTasks.map(task => ({
            title: task.title,
            classification: task.classification,
            createdAt: task.createdAt,
            // Add mocking for duration if not tracked, as the model expects something
            // In a real app, we'd track completedAt.
            completedAt: new Date().toISOString()
        }));

        const response = await fetch('/api/ai/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedTasks: sanitizedTasks }),
        });

        if (!response.ok) throw new Error('Failed to get insights');
        return await response.json();
    } catch (error) {
        console.error('AI Insights Error:', error);
        return null;
    }
}

// No classifyTask function needed anymore
