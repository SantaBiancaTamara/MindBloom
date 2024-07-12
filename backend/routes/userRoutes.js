import { registerUser, loginUser, getAllUsers, logout } from '../handlers/userHandler.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);

router.get('/getAllUsers', getAllUsers) //for validation


export default router;