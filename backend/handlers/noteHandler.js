import Note from '../models/Note.js'

export const insertOrUpdateNote = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;  // Set by your authentication middleware

    if (!content) {
        return res.status(400).send("Content is required");
    }

    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    try {
        const existingNote = await Note.findOne({
            userId: userId,
            timestamp: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        if (existingNote) {
            // Update the existing note's content
            existingNote.content = content;
            await existingNote.save();
            res.status(200).json(existingNote);
        } else {
            // Create a new note with the current timestamp
            const newNote = new Note({ content, userId, timestamp: currentDate });
            await newNote.save();
            res.status(201).json(newNote);
        }
    } catch (error) {
        console.error('Error in insertOrUpdateNote:', error);
        res.status(500).send("Error saving the note");
    }
};

export const getNote = async (req, res) => {
    const userId = req.userId;
    const { timestamp } = req.params;

    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    try {
        const existingNote = await Note.findOne({
            userId: userId,
            timestamp: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingNote) {
            res.status(200).json(existingNote);
        } else {
            res.status(404).json({ message: "No note found for this date" });
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

