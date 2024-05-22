import mongoose from 'mongoose'

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
        duration: {type:String, default:'', required: false},
        frequency: {type:String, default:'', required: false}
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false
    }

})
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;