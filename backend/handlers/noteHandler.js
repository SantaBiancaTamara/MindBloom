import Note from '../models/Note.js'

export const insertOrUpdateNote = async (req, res) => {
    const { content, timestamp } = req.body;
    const userId = req.userId;
  
    if (!content) {
      return res.status(400).send("Content is required");
    }
  
    try {
      const existingNote = await Note.findOneAndUpdate(
        { userId: userId, timestamp: new Date(timestamp) },
        { content },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      res.status(201).json(existingNote);
    } catch (error) {
      console.error('Error in insertOrUpdateNote:', error);
      res.status(500).send("Error saving the note");
    }
  };
  
  export const getNote = async (req, res) => {
    const { timestamp } = req.params;
    const userId = req.userId;
  
    try {
      const date = new Date(timestamp);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
      const note = await Note.findOne({ userId, timestamp: { $gte: startOfDay, $lt: endOfDay } });
      if (note) {
        res.json(note);
      } else {
        res.json({ content: '' });
      }
    } catch (error) {
      console.error('Error fetching note:', error);
      res.status(500).send("Error fetching the note");
    }
  };

export const getNoteById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId; // Get user ID from token

    try {
        const note = await Note.findOne({ _id: id, userId: userId });
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error('Error fetching note by ID:', error);
        res.status(500).send("Error fetching the note");
    }
};

