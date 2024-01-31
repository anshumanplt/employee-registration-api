// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { validateRegistration, handleValidationErrors } = require('../middleware/validationMiddleware');
const { validateLogin, handleLoginValidationErrors } = require('../middleware/authValidationMiddleware');

const authController = require('../controllers/authController');


// Register a new user
router.post('/register', validateRegistration, handleValidationErrors, authController.register);

// Login user
router.post('/login', validateLogin, handleLoginValidationErrors, authController.login);

// Logout user
router.post('/logout', authController.logout);

module.exports = router;
