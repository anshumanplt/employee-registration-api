// src/middleware/authValidationMiddleware.js
const { validationResult, check } = require('express-validator');

// Validation middleware for user login
const validateLogin = [
  // Validate email
  check('email').isEmail().withMessage('Invalid email address'),

  // Validate password
  check('password').notEmpty().withMessage('Password is required'),
];

// Middleware to handle validation errors for login
const handleLoginValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = {
  validateLogin,
  handleLoginValidationErrors,
};
