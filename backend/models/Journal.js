import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
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
  },
  emotions: [{  
    label: { type: String, required: true },
    score: { type: Number, required: true }
  }]
});

//blankPageSchema.index({ userId: 1, timestamp: 1 }, { unique: true });

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
