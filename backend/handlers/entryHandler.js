import Entry from '../models/Entry.js'
import mongoose from 'mongoose';
import Mood from "../models/Mood.js"
import Activity from "../models/Activity.js"

export const insertUserEntry = async (req, res) => {
    try {
      const{ moodId } = req.body;
      const userId = req.userId;
  
      //incomplete entry
      const newEntry = new Entry({
        userId, 
        moodId,
        activityIds: [],
        isComplete:false
      })
      const savedEntry = await newEntry.save();
     // console.log(savedEntry);

      res.status(201).json(savedEntry);
      } catch (error) {
        res.status(400).json({ error: 'Error creating entry' });
    }
  }

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

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1); // Make sure to cover the whole day

    console.log(startDate, endDate);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: no user ID provided' });
    }

   // console.log("Entries before populate: ", entries);  // Check raw entries data

    const populatedEntries = await Entry.find({
      userId: userId,
      timestamp: { $gte: startDate, $lt: endDate }
    }).populate('moodId').populate('activityIds');
    
    console.log("Populated Entries: ", populatedEntries);  // Check populated data

    const entriesWithDetails = populatedEntries.map(entry => ({
      moodName: entry.moodId.name,
      activities: entry.activityIds.map(activity => ({
        name: activity.name,
        description: activity.description,
        moodImpact: activity.moodImpact
      })),
      timestamp: entry.timestamp,
      isComplete: entry.isComplete
    }));

    res.json(entriesWithDetails);
  } catch (error) {
    console.error('Failed to fetch entries for the given date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};