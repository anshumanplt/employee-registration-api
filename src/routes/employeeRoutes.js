const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authenticationMiddleware');
const uuid = require('uuid');
const path = require('path');


const employeeController = require('../controllers/employeeController');
const { authenticationMiddleware } = require('../middleware/authenticationMiddleware');

const uploadDirectory = 'uploads/';
// Configure multer storage and file filter

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using uuid and append the original extension
      const uniqueFilename = uuid.v4() + path.extname(file.originalname);
      cb(null, uniqueFilename);
    },
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
    } else {
        // cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type. Only PDF files are allowed.'));
    }
};



const upload = multer({

    storage: storage,
    fileFilter: fileFilter,
});


// Upload document route
router.post('/upload-document', authMiddleware.verifyToken, (req, res, next) => {
    upload.single('document')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error (e.g., file size exceeds limit or invalid file type)
        return res.status(400).json({ message: err.message + ". Only pdf file is allowed." });
      } else if (err) {
        // Other unexpected errors
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      // Continue to the next middleware (e.g., your uploadDocument function)
      next();
    });
  }, employeeController.uploadDocument);


// Get all documents of the logged-in employee
router.get('/all-documents', authMiddleware.verifyToken, employeeController.getAllDocuments);


module.exports = router;