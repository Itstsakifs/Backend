const jwt = require('jsonwebtoken');

mid = {};

mid.verifyToken = (req, res, next) => {
    const token = req.header('Auth');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = mid;