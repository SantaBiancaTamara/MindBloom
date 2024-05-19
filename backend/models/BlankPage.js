console.log('Attempting to load mongoose...');
import mongoose from 'mongoose';


const blankPageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  timestamp: {
    type: Date,
    default: Date.now 
  }
});

blankPageSchema.index({ userId: 1, timestamp: 1 }, { unique: true });

const BlankPage = mongoose.model('BlankPage', blankPageSchema);

export default BlankPage;
