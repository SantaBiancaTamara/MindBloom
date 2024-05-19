import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    moodImpact: {
        type: String,
        enum: ['positive', 'neutral', 'negative'],
        required: false
    },
    additionalAttributes: {
        duration: { type: String, default: '', required: false },
        frequency: { type: String, default: '', required: false }
    }
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
