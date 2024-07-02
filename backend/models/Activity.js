import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
