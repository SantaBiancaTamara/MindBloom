import { registerUser, loginUser, getAllUsers } from '../handlers/userHandler.js';

const setupUserRoutes = (app) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.get('/getAllUsers', getAllUsers)
};

export default setupUserRoutes;