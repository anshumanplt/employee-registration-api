// src/middleware/validationMiddleware.js
const { validationResult, check } = require('express-validator');

// Validation middleware for user registration
const validateRegistration = [
  // Validate username
  check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  // Validate email
  check('email').isEmail().withMessage('Invalid email address'),

  // Validate password
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Validate confirm password
  check('confirmPassword').isLength({ min: 6 }).withMessage('Confirm password must be at least 6 characters'),

  // Validate password and confirm password
  check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),


  // Validate mobile
  check('mobile').isLength({ min: 10 }).withMessage('Mobile must be at 10 characters'),

  // Validate Emergency conatct number
  check('emergency_contact_number').isLength({ min: 10 }).withMessage('Emergency contact number must be at 10 characters'),

  // Validate blood group 
  check('blood_group').notEmpty().withMessage('Blood group must be required'),

  // Validate address1
  check('address1').notEmpty().withMessage('Address1 must be required'),

  // Validate City
  check('city').notEmpty().withMessage('City must be required'),

  // Validate state
  check('state').notEmpty().withMessage('State must be required'),

  // Validate pincode
  check('pincode').notEmpty().withMessage('Pincode must be required'),

   
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = {
  validateRegistration,
  handleValidationErrors,
};
