// src/models/Document.js
const { DataTypes } = require('sequelize');
const  sequelize = require('../../db');
const Employee = require('./Employee');



const Document = sequelize.define('Document', {
  document_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  document_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  verified_by: {
    type: DataTypes.STRING,
  },
});

// Add foreign key association
Document.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

// Synchronize the model with the database

sequelize.sync({ force: false })
  .then(() => {
    console.log('Document model synced with the database.');
  })
  .catch((error) => {
    console.error('Error syncing Document model:', error);
  });

module.exports = Document;
