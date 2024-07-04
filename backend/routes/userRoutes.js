import { registerUser, loginUser, getAllUsers, logout } from '../handlers/userHandler.js';
import verifyToken from '../middleware/authMiddleware.js';

const setupUserRoutes = (app) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.post('/logout', verifyToken, logout);
    app.get('/getAllUsers', getAllUsers) //for validation
};

export default setupUserRoutes;