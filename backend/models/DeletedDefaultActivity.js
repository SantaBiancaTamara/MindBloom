import mongoose from 'mongoose';

const deletedActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
});

const DeletedDefaultActivity = mongoose.model('DeletedActivity', deletedActivitySchema);

export default DeletedDefaultActivity;
