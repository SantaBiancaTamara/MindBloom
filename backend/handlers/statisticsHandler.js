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

export const getMonthlyMoodCount = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;

    const moodCounts = await Entry.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          timestamp: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
          }
        } 
      },
      { $group: { _id: '$moodId', count: { $sum: 1 } } },
      { $lookup: { from: 'moods', localField: '_id', foreignField: '_id', as: 'mood' } },
      { $unwind: '$mood' },
      { $project: { moodName: '$mood.name', count: 1 } }
    ]);
    res.json(moodCounts);
  } catch (error) {
    console.error('Failed to fetch mood count by month:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWeeklyMoodCount = async (req, res) => {
  try {
    const userId = req.userId;

    const moodCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            week: { $week: "$timestamp" },
            year: { $year: "$timestamp" },
            moodId: "$moodId"
          },
          count: { $sum: 1 }
        }
      },
      { $lookup: { from: 'moods', localField: '_id.moodId', foreignField: '_id', as: 'mood' } },
      { $unwind: '$mood' },
      { $project: { week: '$_id.week', year: '$_id.year', moodName: '$mood.name', count: 1 } },
      { $sort: { year: 1, week: 1 } } // Sort by year and week
    ]);
    res.json(moodCounts);
  } catch (error) {
    console.error('Failed to fetch weekly mood count:', error);
    res.status(500).json({ error: 'Internal server error' });
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

export const getMonthlyActivityCount = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;

    const activityCounts = await Entry.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          timestamp: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
          }
        } 
      },
      { $unwind: '$activityIds' },
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
      },
      { $unwind: '$category' },
      { $project: { activityName: '$activity.name', categoryName: '$category.name', count: 1 } }
    ]);
    res.json(activityCounts);
  } catch (error) {
    console.error('Failed to fetch activity count by month:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWeeklyActivityCount = async (req, res) => {
  try {
    const userId = req.userId;

    const activityCounts = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$activityIds' },
      {
        $group: {
          _id: {
            week: { $week: "$timestamp" },
            year: { $year: "$timestamp" },
            activityId: "$activityIds"
          },
          count: { $sum: 1 }
        }
      },
      { $lookup: { from: 'activities', localField: '_id.activityId', foreignField: '_id', as: 'activity' } },
      { $unwind: '$activity' },
      {
        $lookup: { 
          from: 'categories',
          localField: 'activity.category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      { $project: { week: '$_id.week', year: '$_id.year', activityName: '$activity.name', categoryName: '$category.name', count: 1 } },
      { $sort: { year: 1, week: 1 } } // Sort by year and week
    ]);
    res.json(activityCounts);
  } catch (error) {
    console.error('Failed to fetch weekly activity count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};