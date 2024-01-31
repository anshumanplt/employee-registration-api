const { DataTypes } = require('sequelize');
const  sequelize = require('../../db');

// src/models/Employee.js
const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alternate_mobile_number: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  emergency_contact_number: {
    type: DataTypes.STRING
  },
  blood_group: {
    type: DataTypes.STRING
  },
  address1: {
    type: DataTypes.STRING
  },
  address2: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  pincode: {
    type: DataTypes.STRING
  },
  landmark: {
    type: DataTypes.STRING
  },
  job_role: {
    type: DataTypes.STRING
  },
  salary: {
    type: DataTypes.FLOAT
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_by: {
    type: DataTypes.STRING
  }
});



// Sync the model with the database (create the 'employees' table)


Employee.sync({ force: false })
  .then(() => {
    console.log('Employee model synced with the database.');
  })
  .catch(err => {
    console.error('Error syncing Employee model:', err);
  });

module.exports = Employee;