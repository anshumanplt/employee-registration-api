// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../../config');

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  console.log("Token : ", token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Verify the token
  jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // Attach the decoded user information to the request for later use in route handlers
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
