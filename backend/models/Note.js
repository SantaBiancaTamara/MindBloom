import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})


const Note = mongoose.model('Note', NoteSchema);

export default Note;