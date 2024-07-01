import mongoose from 'mongoose';
import Entry from '../models/Entry.js';
import Mood from '../models/Mood.js';
import Activity from '../models/Activity.js';
import UserActivity from '../models/UserActivity.js';
import Note from '../models/Note.js';
import Journal from '../models/Journal.js';

export const getMoodFluctuationsOverWeek = async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    const entries = await Entry.find({
      userId: userId,
      timestamp: { $gte: startOfWeek }
    }).populate('moodId');

    const moodsOverWeek = entries.reduce((acc, entry) => {
      const day = entry.timestamp.getDay();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry.moodId.name);
      return acc;
    }, {});

    res.json(moodsOverWeek);
  } catch (error) {
    console.error('Failed to fetch mood fluctuations over the week:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMoodFluctuationsOverMonth = async (req, res) => {
  try {
    const userId = req.userId;
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const entries = await Entry.find({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    }).populate('moodId');

    const moodsOverMonth = entries.reduce((acc, entry) => {
      const day = entry.timestamp.getDate();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry.moodId.name);
      return acc;
    }, {});

    res.json(moodsOverMonth);
  } catch (error) {
    console.error('Failed to fetch mood fluctuations over the month:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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

export const getTopActivities = async (req, res) => {
  try {
    const userId = req.userId;

    const topActivities = await Entry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$activityIds' },
      { $group: { _id: '$activityIds', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'activities', localField: '_id', foreignField: '_id', as: 'activity' } },
      { $unwind: '$activity' },
      { $project: { activityName: '$activity.name', count: 1 } }
    ]);

    res.json(topActivities);
  } catch (error) {
    console.error('Failed to fetch top activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
