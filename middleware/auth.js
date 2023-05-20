const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
    return res.status(401).json({ message: 'Token Tidak Ada' });
    }

    try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
    } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;