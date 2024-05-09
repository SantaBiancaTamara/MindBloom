import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;