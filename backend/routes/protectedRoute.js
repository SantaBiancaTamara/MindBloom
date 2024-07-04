// Adjusted protected route definition
import express from 'express';

import verifyToken from '../middleware/authMiddleware.js';
import { getAllCategories, getAllActivities, getMoods, getCategoryWithActivities, getOneCategoryWithActivities, addUserActivity, getAllUserActivity, getAllActivitiesForUser, deleteUserActivity } from '../handlers/categoryActivityHandler.js'
import { completeUserEntry, getAllUserEntries, insertUserEntry, getUserEntriesByDay, getAllEntries } from '../handlers/entryHandler.js';
import { insertJournal,getAllJournals, getJournal, getJournalById, getJournalsByDate } from '../handlers/journalHandler.js';
import {fetchQuotes} from '../handlers/quotes.js'
import {text_classif} from "../handlers/text_classif_handler.js"
import { insertOrUpdateNote , getNote, getNoteById} from '../handlers/noteHandler.js';
import { getMoodCount, getActivityCount } from '../handlers/statisticsHandler.js';

const router = express.Router();

//activities and categoryes
router.get('/getCategories', verifyToken, getAllCategories);
router.get('/getActivities', verifyToken, getAllActivities);
router.get('/getMoods', verifyToken, getMoods);
router.get('/getCategorywithActivities', verifyToken, getCategoryWithActivities);
router.get('/getOneCategoryWithActivities', verifyToken, getOneCategoryWithActivities);
//activity schema customization
router.post("/addUserActivity", verifyToken, addUserActivity);
router.get("/getAllUserActivity", verifyToken, getAllUserActivity)
router.get("/getAllActivitiesForUser", verifyToken, getAllActivitiesForUser);
router.delete('/deleteUserActivity/:id', verifyToken, deleteUserActivity);

//entries
router.post('/insertIncompleteEntry', verifyToken, insertUserEntry);
router.patch('/insertCompleteEntry/:entryId', verifyToken, completeUserEntry);
router.get('/userEntries', verifyToken, getAllUserEntries);
router.get('/entries/:date', verifyToken, getUserEntriesByDay);
router.get('/getAllEntries', getAllEntries);

//journal
router.post('/insertJournal', verifyToken, insertJournal)
router.get('/getJournal/:timestamp', verifyToken, getJournal);
router.get("/getAllJournals", getAllJournals)
router.get('/getJournalById/:id', verifyToken, getJournalById);
router.get('/journals/date/:date', verifyToken, getJournalsByDate);

//note
router.post('/insertOrUpdateNote', verifyToken, insertOrUpdateNote)
router.get('/getNote/:timestamp', verifyToken, getNote);
router.get('/getNoteById/:id', verifyToken, getNoteById);

//quotes
router.get("/fetchQuotes", verifyToken, fetchQuotes)

//text classification
router.post("/text_classif", verifyToken, text_classif);

//statistics
router.get("/getMoodCount", verifyToken, getMoodCount);
router.get("/getActivityCount", verifyToken, getActivityCount);




export default router;
