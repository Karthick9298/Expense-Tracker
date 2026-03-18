import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Auth middleware — verifies the JWT from the httpOnly cookie.
 * Attaches the full user document (minus __v) to `req.user`.
 *
 * Usage: router.get('/protected', protect, handler)
 */
const protect = async (req, res, next) => {
    try {
        // 1. Extract token from httpOnly cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized — no token provided.' });
        }

        // 2. Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Session expired. Please log in again.' });
            }
            return res.status(401).json({ message: 'Not authorized — invalid token.' });
        }

        // 3. Fetch user from DB (ensure they still exist)
        const user = await User.findById(decoded.userId).select('-__v');
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists.' });
        }

        // 4. Attach user to request and continue
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(500).json({ message: 'Authentication failed.' });
    }
};

export default protect;
