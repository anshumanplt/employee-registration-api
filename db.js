// src/db.js
const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
