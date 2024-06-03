// Adjusted protected route definition
import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/authMiddleware.js';
import { getAllCategories, getAllActivities, getMoods, getCategoryWithActivities, getOneCategoryWithActivities, addUserActivity, getAllUserActivity, getAllActivitiesForUser, deleteUserActivity } from '../handlers/categoryActivityHandler.js'
import { completeUserEntry, getAllUserEntries, insertUserEntry, getUserEntriesByDay, getAllEntries } from '../handlers/entryHandler.js';
import { insertOrUpdateNote,getAllBlankPages, getBlankPage } from '../handlers/blankPageHandler.js';
import {fetchQuotes} from '../handlers/quotes.js'
import {text_classif} from "../handlers/text_classif_handler.js"


router.get('/getCategories', verifyToken, getAllCategories);
router.get('/getActivities', verifyToken, getAllActivities);
router.get('/getMoods', verifyToken, getMoods);
router.get('/getCategorywithActivities', verifyToken, getCategoryWithActivities);
router.get('/getOneCategoryWithActivities', verifyToken, getOneCategoryWithActivities);
router.post('/insertIncompleteEntry', verifyToken, insertUserEntry);
router.patch('/insertCompleteEntry/:entryId', verifyToken, completeUserEntry);
router.get('/userEntries', verifyToken, getAllUserEntries);
router.get('/entries/:date', verifyToken, getUserEntriesByDay);
router.get('/getAllEntries', getAllEntries);
router.post('/insertOrUpdateNote', verifyToken, insertOrUpdateNote)
router.get('/getBlankPage/:timestamp', verifyToken, getBlankPage);
router.get("/getAllBlankPages", getAllBlankPages)
router.get("/fetchQuotes", verifyToken, fetchQuotes)
router.post("/addUserActivity", verifyToken, addUserActivity);
router.get("/getAllUserActivity", verifyToken, getAllUserActivity)
router.get("/getAllActivitiesForUser", verifyToken, getAllActivitiesForUser);
router.delete('/deleteUserActivity/:id', verifyToken, deleteUserActivity);
router.post("/text_classif", verifyToken, text_classif);

export default router;
