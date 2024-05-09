import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    // Extract the token from the Authorization header
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    

    // Split the Authorization header to extract the token
    const token = bearerHeader.split(' ')[1]; // Assuming format "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the same secret key used for signing
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

export default verifyToken;
