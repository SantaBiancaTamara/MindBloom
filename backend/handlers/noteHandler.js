import Note from '../models/Note.js'

export const insertOrUpdateNote = async (req, res) => {
  const { content, timestamp } = req.body; 
  const userId = req.userId;

  console.log(content, timestamp);

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
  const { timestamp } = req.query; 
  const userId = req.userId;

  try {
    const date = new Date(timestamp);
    const date2 = date;
    const startOfDay = new Date(date2.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date2.setHours(23, 59, 59, 999));

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



