import express from 'express';

import verifyToken from '../middleware/authMiddleware.js';
import { getAllCategories, getAllActivities, getMoods, getCategoryWithActivities, getOneCategoryWithActivities, addUserActivity, getAllActivitiesForUser } from '../handlers/categoryActivityHandler.js'
import { completeUserEntry, getAllUserEntries, insertUserEntry, getUserEntriesByDay, getAllEntries } from '../handlers/entryHandler.js';
import { insertJournal,getAllJournals, getJournal, getJournalById, getJournalsByDate } from '../handlers/journalHandler.js';
import {fetchQuotes} from '../handlers/quotes.js'
import {classifyTextHandler} from "../handlers/classif_handler.js"
import { insertOrUpdateNote , getNote, getNoteById} from '../handlers/noteHandler.js';
import { getMoodCount, getActivityCount } from '../handlers/statisticsHandler.js';

const router = express.Router();

//activities and categories and moods for entries
router.get('/getMoods', verifyToken, getMoods);
//activity schema customization
router.post("/addUserActivity", verifyToken, addUserActivity);
router.get("/getAllActivitiesForUser", verifyToken, getAllActivitiesForUser);

//entries
router.post('/insertIncompleteEntry', verifyToken, insertUserEntry);
router.patch('/insertCompleteEntry/:entryId', verifyToken, completeUserEntry);
router.get('/userEntries', verifyToken, getAllUserEntries);
router.get('/entries/:date', verifyToken, getUserEntriesByDay);

//journal
router.post('/insertJournal', verifyToken, insertJournal)
router.get('/getJournal/:timestamp', verifyToken, getJournal);
router.get('/getJournalById/:id', verifyToken, getJournalById);
router.get('/journals/date/:date', verifyToken, getJournalsByDate);

//note
router.post('/insertOrUpdateNote', verifyToken, insertOrUpdateNote)
router.get('/getNote/:timestamp', verifyToken, getNote);
router.get('/getNoteById/:id', verifyToken, getNoteById);

//quotes
router.get("/fetchQuotes", verifyToken, fetchQuotes)

//text classification
router.post("/text_classif", verifyToken, classifyTextHandler);

//statistics
router.get("/getMoodCount", verifyToken, getMoodCount);
router.get("/getActivityCount", verifyToken, getActivityCount);

//for verifications
router.get("/getAllJournals", getAllJournals)
router.get('/getCategories', verifyToken, getAllCategories);
router.get('/getActivities', verifyToken, getAllActivities);
router.get('/getCategorywithActivities', verifyToken, getCategoryWithActivities);
router.get('/getOneCategoryWithActivities', verifyToken, getOneCategoryWithActivities);
router.get('/getAllEntries', getAllEntries);

export default router;
