import Journal from '../models/Journal.js';
import { text_classif } from '../handlers/classif_handler.js';

// insert a new journal entry
export const insertJournal = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId; 
  
    if (!content) {
      return res.status(400).json({ message: 'Content required' });
    }
  
    const date = new Date();  
  
    try {
      console.log('Text to be classified:', content);
      const emotions = await text_classif(content);
      console.log('Emotions detected:', emotions);
  
      // check emotions to be in the correct format
      if (!Array.isArray(emotions) || emotions.length === 0 || !emotions.every(e => e.label && e.score)) {
        console.error('Wrong emotions format:', emotions);
        return res.status(400).json({ message: 'Wrong emotions format' });
      }
  
      const newJournal = new Journal({ content, timestamp: date, userId, emotions });
      await newJournal.save();
      res.status(201).json({ message: 'Journal successfully saved', emotions });
    } catch (error) {
      console.error('Error while insertJournal');
      res.status(500).json({ message: 'Internal server error while saving the journal'});
    }
  };

// get journals by date
export const getJournalsByDate = async (req, res) => {
  const userId = req.userId;
  const { selectedDate } = req.params;

  const startDate = new Date(selectedDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  try {
    const journals = await Journal.find({
      userId: userId,
      timestamp: {
        $gte: startDate,
        $lt: endDate
      }
    });

    if (journals.length > 0) {
      res.status(200).json(journals);
    } else {
      res.status(404).json({ message:'No journals found for this date'});
    }
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ message:'error fetching the jorunals', error:error.message});
  }
};

// get a journal by id
export const getJournalById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; 

  try {
    const journal = await Journal.findOne({ _id:id, userId:userId });
    if (journal) {
      res.status(200).json(journal);
    } else {
      res.status(404).json({message:'Journal not found'});
    }
  } catch (error) {
    console.error('Error fetching journal by ID:', error);
    res.status(500).json({message:'Error fetching the journal', error:error.message});
  }
};

// delete journal by id
export const deleteJournalById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; 

  try {
    const journal = await Journal.findOneAndDelete({_id:id, userId:userId});
    if (journal) {
      res.status(200).json({ message:'Journal deleted successfully' });
    } else {
      res.status(404).json({ message:'Journal not found'});
    }
  } catch (error) {
    console.error('Error deleting journal by ID:', error);
    res.status(500).json({ message: 'Error deleting the journal', error: error.message });
  }
};
