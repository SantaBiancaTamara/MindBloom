import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../utils/tokenBlacklist.js';


function verifyToken(req, res, next) {
  
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const token = bearerHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    //for logout
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ error: 'Token has been logged out.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({error:'Invalid token.'});
    }
};

export default verifyToken;



