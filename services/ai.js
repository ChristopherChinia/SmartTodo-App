/**
 * Constants for Task Classification
 * Kept for UI consistency after removing AI logic.
 */

export const CLASSIFICATION_TYPES = {
    URGENT_IMPORTANT: 'urgent_important',       // Do First
    NOT_URGENT_IMPORTANT: 'not_urgent_important',   // Schedule
    URGENT_NOT_IMPORTANT: 'urgent_not_important',   // Delegate
    NOT_URGENT_NOT_IMPORTANT: 'not_urgent_not_important', // Delete
};

export const CLASSIFICATION_LABELS = {
    [CLASSIFICATION_TYPES.URGENT_IMPORTANT]: 'Do First',
    [CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT]: 'Schedule',
    [CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT]: 'Delegate',
    [CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT]: 'Delete',
};

export const CLASSIFICATION_COLORS = {
    [CLASSIFICATION_TYPES.URGENT_IMPORTANT]: 'bg-red-500',
    [CLASSIFICATION_TYPES.NOT_URGENT_IMPORTANT]: 'bg-blue-500',
    [CLASSIFICATION_TYPES.URGENT_NOT_IMPORTANT]: 'bg-yellow-500',
    [CLASSIFICATION_TYPES.NOT_URGENT_NOT_IMPORTANT]: 'bg-gray-500',
};

// No classifyTask function needed anymore
