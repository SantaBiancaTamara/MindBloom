import Entry from '../models/Entry.js'
import mongoose from 'mongoose';
import Mood from "../models/Mood.js"
import Activity from "../models/Activity.js"
//import UserActivity from '../models/UserActivity.js';
import Note from '../models/Note.js'
import Journal from '../models/Journal.js'

export const insertUserEntry = async (req, res) => {
  try {
      console.log('Request body:', req.body);
      const { moodId } = req.body;
      const userId = req.userId;

      if (!mongoose.Types.ObjectId.isValid(moodId)) {
          return res.status(400).json({ error: 'Invalid mood ID' });
      }

      const mood = await Mood.findById(moodId);
      if (!mood) {
          return res.status(404).json({ error: 'Mood not found' });
      }

      const newEntry = new Entry({
          userId,
          moodId,
          activityIds: [],
          isComplete: false
      });

      const savedEntry = await newEntry.save();
      res.status(201).json(savedEntry);
  } catch (error) {
      console.error('Error creating entry:', error);
      res.status(400).json({ error: 'Error creating entry' });
  }
};


  export const completeUserEntry = async (req, res) => {
    try {
        const { activityIds } = req.body;
        const entryId = req.params.entryId;
        const userId = req.userId;
        
        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: entryId, userId: userId }, 
            {
                $set: { activityIds: activityIds, isComplete: true },
                $currentDate: { timestamp: true } 
            },
            { new: true } 
        );
    
        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found or user mismatch' });
        }
    
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error updating entry' });
    }
};


export const getAllUserEntries = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: no user id provided' });
    }

    const { month, page = 1, limit = 15 } = req.query;
    const monthNumber = parseInt(month, 10);

    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month parameter' });
    }

    const startOfMonth = new Date(new Date().getFullYear(), monthNumber - 1, 1);
    const endOfMonth = new Date(new Date().getFullYear(), monthNumber, 0);
    const skip = (page - 1) * limit;

    // Fetch entries
    const allUserEntries = await Entry.find({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    })
      .populate('moodId')
      .populate('activityIds')
      .skip(skip)
      .limit(parseInt(limit, 10))
      .sort({ timestamp: 1 });

    const totalEntries = await Entry.countDocuments({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    });

    // Fetch notes and journals
    const allUserNotes = await Note.find({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    });

    const allUserJournals = await Journal.find({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    });

    const entriesWithJournals = allUserEntries.map(entry => {
      const entryDate = new Date(entry.timestamp).toDateString();
      const journalsForEntry = allUserJournals.filter(journal => new Date(journal.timestamp).toDateString() === entryDate);
      return { ...entry._doc, journals: journalsForEntry };
    });

    res.json({
      entries: entriesWithJournals,
      notes: allUserNotes,
      total: totalEntries
    });
  } catch (error) {
    console.error('Failed to fetch entries: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//for verifications
export const getAllEntries = async(req, res) => {
  try {
    const entries = await Entry.find({})
    res.json(entries);

  } catch (error) {
    console.error('Error retrieving entries', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export const getUserEntriesByDay = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: no user ID provided' });
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const populatedEntries = await Entry.find({
      userId: new mongoose.Types.ObjectId(userId),
      timestamp: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    }).populate('moodId')
      .populate({
        path: 'activityIds',
        model: Activity,
        populate: { path: 'category' }
      });

    const entriesWithDetails = populatedEntries.map(entry => ({
      timestamp: entry.timestamp,
      moodName: entry.moodId.name,
      activities: entry.activityIds.map(activity => ({
        name: activity.name,
        category: activity.category ? { name: activity.category.name } : null,
        isDefault: activity.isDefault
      })),
      isComplete: entry.isComplete
    }));

    res.json(entriesWithDetails);
  } catch (error) {
    console.error('Failed to fetch entries for the given date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};