import Entry from '../models/Entry.js'
import mongoose from 'mongoose';
import Mood from "../models/Mood.js"
import Activity from "../models/Activity.js"


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
          return res.status(404).json({ error:'Mood not found'});
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
      console.error('Error insert entry:',error);
      res.status(400).json({ error:'Error insert entry'});
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
            return res.status(404).json({error:'Entry not found or user mismatch'});
        }
    
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error:'Error update entry'});
    }
};


export const getAllUserEntries = async (req, res) => {
  try {
    const userId = req.userId;

    const { month, page = 1 } = req.query; 
    const monthNumber = parseInt(month, 10);
    const limit = 15;

    const startOfMonth = new Date(new Date().getFullYear(), monthNumber - 1, 1); //month must be in [0,11] interval
    const endOfMonth = new Date(new Date().getFullYear(), monthNumber, 0);

    const skip = (page - 1) * limit; //how many documtns to skip according to the page

    const allUserEntries = await Entry.find({
      userId: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth }
    })
      .populate('moodId', 'name')
      .populate('activityIds', 'name')
      .skip(skip)
      .limit(limit) // Always use the fixed limit
      .sort({ timestamp: 1 })
      .select('timestamp moodId activityIds');

    //for frontend to calculate the nr of pages
    const totalEntries = await Entry.countDocuments({
      userId: userId,
      timestamp: { $gte: startOfMonth.toISOString(), $lt: endOfMonth.toISOString() }
    });

    res.json({
      entries: allUserEntries,
      total: totalEntries 
    });
  } catch (error) {
    console.error('Failed to fetch entries: ', error);
    res.status(500).json({ error: 'Internal server error fetching entries' });
  }
};

export const getUserEntriesByDay = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.userId;

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const dayEntries = await Entry.find({
      userId: new mongoose.Types.ObjectId(userId),
      timestamp: { $gte: startDate, $lt: endDate }
    })
      .populate('moodId', 'name')
      .populate({
        path: 'activityIds',
        model: Activity,
        populate: { path: 'category', select: 'name' }
      })
      .sort({ timestamp: 1 })
      .select('timestamp moodId activityIds');

    res.json(dayEntries);
  } catch (error) {
    console.error('Failed to fetch entries for the given date:', error);
    res.status(500).json({ error: 'Internal server error fetching entries' });
  }
};

//for verifications
export const getAllEntries = async(req, res) => {
  try {
    const entries = await Entry.find({})
    res.json(entries);

  } catch (error) {
    console.error('Error get all entries', error);
      res.status(500).json({ error:'Internal server error get all entries' });
  }
}