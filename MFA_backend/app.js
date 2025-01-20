require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const app = express();


const pool = require('./database'); // Import the database connection


const authRoutes = require('./routes/auth'); // Import auth routes

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/auth', authRoutes);


app.use(cors({ origin: 'http://localhost:3000' }));


// Placeholder route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
