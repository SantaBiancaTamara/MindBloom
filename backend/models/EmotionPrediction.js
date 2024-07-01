import mongoose from 'mongoose';

const emotionPredictionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    predictions: [{
        label: { type: String, required: true },
        score: { type: Number, required: true }
    }]
});

const EmotionPrediction = mongoose.model('EmotionPrediction', emotionPredictionSchema);

export default EmotionPrediction;