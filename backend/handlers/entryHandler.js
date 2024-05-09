import Entry from '../models/Entry.js'
import mongoose from 'mongoose';

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


export const completeUserEntry= async (req, res) => {
    try {
        const { activityIds } = req.body;
        const entryId = req.params.entryId;
        const userId = req.userId
        
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


export const getEntriesForDay = async (req, res) => {
  try {
      const { date } = req.params;
      const userId = req.userId;

      if (!userId) {
          console.log("No user ID provided");
          return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
      }

      const utcDateStart = new Date(`${date}T00:00:00.000Z`);
      const utcDateEnd = new Date(`${date}T23:59:59.999Z`);

      console.log(`Query for userId: ${userId} from ${utcDateStart.toISOString()} to ${utcDateEnd.toISOString()}`);
      
      // Perform the query and populate the details
      const entries = await Entry.find({
          userId: userId,
          timestamp: {
              $gte: utcDateStart,
              $lte: utcDateEnd
          }
      })
      .populate('userId', 'fullName nickname')  // Populates user details and selects fullName and nickname fields
      .populate('moodId', 'name')  // Populates mood details and selects name field
      .populate('activityIds', 'name');  // Populates activities details and selects name field for each activity

      console.log(`Entries fetched: ${entries.length}`);
      if (entries.length === 0) {
          console.log("No entries found for this user on the specified date.");
          return res.json({ message: "No entries found for this date." });
      }

      // Convert the populated entries to a format that is easy to manage in the frontend
      const formattedEntries = entries.map(entry => ({
          id: entry._id,
          userFullName: entry.userId.fullName,
          userNickname: entry.userId.nickname,
          mood: entry.moodId.name,
          activities: entry.activityIds.map(a => a.name),
          date: entry.timestamp.toLocaleDateString(),
          time: entry.timestamp.toLocaleTimeString(),
          isComplete: entry.isComplete
      }));

      res.json(formattedEntries);
  } catch (error) {
      console.error('Error retrieving entries for the day:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};



// export const getEntriesForDay = async (req, res) => {
//   try {
//       const { date } = req.params;
//       const userId = req.userId;

//       if (!userId) {
//           return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
//       }

//       // Ensure the date uses UTC midnight to prevent timezone issues
//       const utcDateStart = new Date(`${date}T00:00:00.000Z`);
//       const utcDateEnd = new Date(`${date}T23:59:59.999Z`);

//       const entries = await Entry.find({
//           userId: userId,
//           timestamp: {
//               $gte: utcDateStart,
//               $lte: utcDateEnd
//           }
//       });

//       console.log(`Querying entries from ${utcDateStart.toISOString()} to ${utcDateEnd.toISOString()}`);
//       console.log(entries)
//       res.json(entries);
//   } catch (error) {
//       console.error('Error retrieving entries for the day:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };


// export const getEntriesForDay = async (req, res) => {
//   try {
//       const { date } = req.params;
//       const userId = req.userId;

//       if (!userId) {
//           return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
//       }

//       // Convert local date to UTC by subtracting the time zone offset
//       const localDate = new Date(date); // This will be in local time zone when created in JavaScript
//       localDate.setHours(0, 0, 0, 0); // start of the local day

//       // Adjust to UTC
//       const dayStart = new Date(localDate.getTime() - (3 * 60 * 60 * 1000)); // subtract 3 hours
//       const dayEnd = new Date(localDate.getTime() + (21 * 60 * 60 * 1000) + 999); // 24 hours from start minus 3 hours

//       const entries = await Entry.find({
//           userId: userId,
//           timestamp: {
//               $gte: dayStart,
//               $lte: dayEnd
//           }
//       });

//       console.log(`Querying entries from ${dayStart.toISOString()} to ${dayEnd.toISOString()}`);
//       res.json(entries);
//   } catch (error) {
//       console.error('Error retrieving entries for the day:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };


// export const getEntriesForDay = async (req, res) => {
//   try {
//       const { date } = req.params;
//       const userId = req.userId;

//       if (!userId) {
//           return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
//       }

//       // Assuming 'date' is in the format 'YYYY-MM-DD' and you want to use UTC
//       const dayStart = new Date(`${date}T00:00:00.000Z`); // Start of the day in UTC
//       const dayEnd = new Date(`${date}T23:59:59.999Z`);   // End of the day in UTC

//       const entries = await Entry.find({
//           userId: userId,
//           timestamp: {
//               $gte: dayStart,
//               $lte: dayEnd
//           }
//       });

//       console.log(`Querying entries from ${dayStart.toISOString()} to ${dayEnd.toISOString()}`);
//       res.json(entries);
//   } catch (error) {
//       console.error('Error retrieving entries for the day:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
