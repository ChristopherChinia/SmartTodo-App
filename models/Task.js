import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this task.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    description: {
        type: String,
    },
    classification: {
        type: String,
        enum: [
            'URGENT_IMPORTANT',
            'URGENT_NOT_IMPORTANT',
            'NOT_URGENT_IMPORTANT',
            'NOT_URGENT_NOT_IMPORTANT'
        ],
        default: 'NOT_URGENT_NOT_IMPORTANT',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Ensure virtual fields are serialized.
TaskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
