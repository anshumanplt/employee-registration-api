// src/controllers/employeeController.js
const Employee = require('../models/Employee');
const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const  sequelize = require('../../db');

// Handle validation errors during file uploading
const handleFileValidationError = (err, res) => {
  if (err instanceof multer.MulterError) {
    // Multer error (e.g., file size exceeds the limit)
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Other validation errors (e.g., file type not allowed)
    return res.status(400).json({ message: err.message });
  }
};

// Upload document function
const uploadDocument = async (req, res) => {
  try {
    console.log(req.user);
    // Check if a file was provided in the request
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }


    // Assuming you have the employee ID in the request body
    const employeeId = req.user.userId;
    const documentType = req.body.document_type;

    // Check if a document with the same type already exists for the employee
    const existingDocument = await Document.findOne({
      where: {
        employee_id: employeeId,
        document_type: documentType,
      },
    });

    if (existingDocument) {
      // Update the filename of the existing document
      existingDocument.file_name = req.file.filename;
      await existingDocument.save();

      return res.status(200).json({ message: 'Document updated successfully', document: existingDocument });
    } else {
      // Create a new document record in the database
      const newDocument = await Document.create({
        employee_id: employeeId,
        document_type: req.body.document_type,
        file_name: req.file.filename,
        status: 'Pending', // Set status as needed
        verified_by: null, // Initially set to null
      });

      res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    }
  } catch (error) {
    console.error('Error uploading document:', error);

    // Handle specific errors and provide meaningful responses
    if (error instanceof multer.MulterError) {
      // Multer error (e.g., file size exceeds limit or invalid file type)
      return res.status(400).json({ message: error.message });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (e.g., duplicate document type)
      return res.status(400).json({ message: 'Document type already exists for this employee' });
    } else {
      // Generic server error response
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const employeeId = req.user.userId;

    const BASE_URL = 'http://localhost:3000/uploads/';

    const documents = await Document.findAll({
      where: {
        employee_id: employeeId,
      },
      attributes: [
        'document_id',
        'employee_id',
        'document_type',
        'file_name',
        'status',
        'created_at',
        'updated_at',
        'verified_by',
        // Include the virtual property in the attributes
        [sequelize.literal(`CONCAT('${BASE_URL}',file_name)`), 'file_url'],
      ],
    });

    return res.status(200).json({ documents });
  } catch (error) {
    console.error('Error getting documents:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  uploadDocument,
  getAllDocuments
};
