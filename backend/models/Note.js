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

NoteSchema.index({userId:1, timestamp:1}, {unique:true})

const Note = mongoose.model('Note', NoteSchema);

export default Note;