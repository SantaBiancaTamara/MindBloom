// Adjusted protected route definition
import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/authMiddleware.js';
import { getAllCategories, getAllActivities, getMoods, getCategoryWithActivities, getOneCategoryWithActivities } from '../handlers/categoryActivityHandler.js'
import { completeUserEntry, getAllUserEntries, insertUserEntry, getUserEntriesByDay, getAllEntries } from '../handlers/entryHandler.js';
import { insertNote,getAllBlankPages } from '../handlers/blankPageHandler.js';


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
router.post('/insertNote', verifyToken, insertNote)
router.get("/getAllBlankPages", getAllBlankPages)

export default router;
