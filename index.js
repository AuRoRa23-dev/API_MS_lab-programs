// Load environment variables from .env file
require('dotenv').config({ path: './config/.env' });

const express = require('express');   // Import Express framework
const cors = require('cors');         // Import CORS middleware

const app = express();                // Create Express app

app.use(cors());                      // Enable CORS
app.use(express.json());              // Allow server to read JSON data from request body

// Attach student routes to this base URL
app.use('/api/students', require('./modules/student/routes'));

const PORT = process.env.PORT || 3000;  // Read port from .env file

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
