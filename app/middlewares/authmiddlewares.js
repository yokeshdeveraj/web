const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'Invalid token.' });
  }
}

module.exports = {
  authenticateToken,
};
