import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood',
    required: true
  },
  activityIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
