const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const path = require('path');

const db = require('./db'); // Import the db.js file

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Assuming your files are stored in the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load routes
app.use('/api/employee', require('./src/routes/employeeRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));


const PORT = config.PORT;

db.sync()
  .then(() => {
    console.log('All models synced with the database.');
    // Start the server after syncing
  })
  .catch(err => {
    console.error('Error syncing models with the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
