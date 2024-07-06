import mongoose from 'mongoose';
import Entry from '../models/Entry.js';


export const getMoodCount = async (req, res) => {
  try {
    const userId = req.userId;

    const moodCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, //fiter entries by userId
      { $group: { _id: '$moodId', count: { $sum: 1 } } }, //group by mood and occurence
      { $lookup: { from: 'moods', localField: '_id', foreignField: '_id', as: 'mood' } }, 
      // join mood collection to have more details
      { $unwind: '$mood' }, // convert to document 
      { $project: { moodName: '$mood.name', count: 1 } } //the outputs
    ]);
    res.json(moodCounts);
  } catch (error) {
    console.error('failed to fetch mood count:',error);
    res.status(500).json({ error:'internal server error'});
  }
};

export const getActivityCount = async (req, res) => {
  try {
    const userId = req.userId;

    const activityCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, //filter entries by userId
      { $unwind: '$activityIds' }, 
      //take each activity from activities array (unwind)
      { $group: { _id: '$activityIds', count: { $sum: 1 } } }, 
      { $lookup: { from: 'activities', localField: '_id', foreignField: '_id', as: 'activity' } }, 
      { $unwind: '$activity' },
      {
        $lookup: { 
          from: 'categories',
          localField: 'activity.category',
          foreignField: '_id',
          as: 'category'
        }
      }, //join the category collection for details
      { $unwind: '$category' },
      { $project: { activityName: '$activity.name', categoryName: '$category.name', count: 1 } } //output
    ]);
    res.json(activityCounts);
  } catch (error) {
    console.error('failed to fetch activity count:',error);
    res.status(500).json({ error:'internal server error'});
  }
};