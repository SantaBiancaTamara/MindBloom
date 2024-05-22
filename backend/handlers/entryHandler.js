import Entry from '../models/Entry.js'
import mongoose from 'mongoose';
import Mood from "../models/Mood.js"
import Activity from "../models/Activity.js"
import UserActivity from '../models/UserActivity.js';

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
            { _id: entryId, userId: userId }, // Ensure this entry belongs to the user
            {
                $set: { activityIds: activityIds, isComplete: true },
                $currentDate: { timestamp: true } // Update timestamp if necessary
            },
            { new: true } // Return the updated document
        );
    
        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found or user mismatch' });
        }
    
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error updating entry' });
    }
};



export const getAllUserEntries= async (req,res) => {
  try {
    const userId = req.userId;

    if(!userId) {
      return res.status(401).json({error: 'Unauthorized: no user id provided'})
    }

    const allUserEntries = await Entry.find({userId: userId})
    res.json(allUserEntries)
  } catch (error) {
   console.error('Failed to fetch entries: ',error);
   res.status(500).json({error: 'Internal server error'}); 
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
    const userId = req.userId; // Assuming userId is set by your authentication middleware from the token

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
        populate: { path: 'category' } // populate category if needed
      });

    // Fetch user-defined activities separately
    const userActivities = await UserActivity.find({ user: userId });

    const entriesWithDetails = populatedEntries.map(entry => ({
      moodName: entry.moodId.name,
      activities: entry.activityIds.map(activity => {
        const userActivity = userActivities.find(ua => ua._id.equals(activity._id));
        if (userActivity) {
          return {
            name: userActivity.name,
            description: userActivity.description,
            moodImpact: userActivity.moodImpact,
            additionalAttributes: userActivity.additionalAttributes,
          };
        } else {
          return {
            name: activity.name,
            description: activity.description,
            moodImpact: activity.moodImpact,
            additionalAttributes: activity.additionalAttributes,
          };
        }
      }),
      timestamp: entry.timestamp,
      isComplete: entry.isComplete
    }));

    res.json(entriesWithDetails);
  } catch (error) {
    console.error('Failed to fetch entries for the given date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};