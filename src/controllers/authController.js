// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Employee = require('../models/Employee'); // Assuming you have a Employee model

// Register a new Employee
const register = async (req, res) => {
  // The validation middleware is applied before this function is executed
  // const { Employeename, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingEmployee = await Employee.findOne({ where: { email : req.body.email } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let reqData = req.body;
    reqData.password = hashedPassword;

    // Create a new Employee
    const newEmployee = await Employee.create(reqData);

    res.status(201).json({ message: 'Employee registered successfully', Employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Login user
const login = async (req, res) => {
  // The validation middleware is applied before this function is executed
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Employee.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: user.id, email: user.email }, config.SECRET_KEY, {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Logout user and invalidate JWT token
const logout = (req, res) => {
  // Retrieve the token from the request (you may need to adjust how the token is sent in your application)
  const token = req.headers.authorization.split(' ')[1];

  // Expire the token by setting the expiration time to a past date
  const expiredToken = jwt.sign({}, config.SECRET_KEY, { expiresIn: '1ms' }); // Set expiration to 1 millisecond

  // Send the expired token in the response (optional, just for demonstration purposes)
  res.json({ message: 'Logout successful', expiredToken });
};

module.exports = {
  register,
  login,
  logout,
};
