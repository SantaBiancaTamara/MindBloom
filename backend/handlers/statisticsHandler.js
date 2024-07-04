import mongoose from 'mongoose';
import Entry from '../models/Entry.js';


export const getMoodCount = async (req, res) => {
  try {
    const userId = req.userId;

    const moodCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$moodId', count: { $sum: 1 } } },
      { $lookup: { from: 'moods', localField: '_id', foreignField: '_id', as: 'mood' } },
      { $unwind: '$mood' },
      { $project: { moodName: '$mood.name', count: 1 } }
    ]);

    res.json(moodCounts);
  } catch (error) {
    console.error('Failed to fetch mood count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getActivityCount = async (req, res) => {
  try {
    const userId = req.userId;

    const activityCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Use 'new' keyword
      { $unwind: '$activityIds' }, // Unwind the activityIds array
      { $group: { _id: '$activityIds', count: { $sum: 1 } } }, // Group by activityIds and count
      { $lookup: { from: 'activities', localField: '_id', foreignField: '_id', as: 'activity' } }, // Lookup activity details
      { $unwind: '$activity' }, // Unwind the activity array
      {
        $lookup: { // Lookup category details
          from: 'categories',
          localField: 'activity.category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' }, // Unwind the category array
      { $project: { activityName: '$activity.name', categoryName: '$category.name', count: 1 } } // Project the necessary fields
    ]);

    res.json(activityCounts);
  } catch (error) {
    console.error('Failed to fetch activity count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};