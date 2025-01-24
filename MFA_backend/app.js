require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./models/index'); // Sequelize instance
const User = require('./models/User'); // User model
const pool = require('./database'); // Import the database connection
const authRoutes = require('./routes/auth'); // Import auth routes

// Apply CORS middleware at the top
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and credentials if needed
}));

// Handle preflight requests
app.options('*', cors());

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/auth', authRoutes);

// Placeholder route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Synchronize Sequelize models
sequelize
  .sync({ alter: true }) // Automatically creates/updates tables
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
