const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Load connection string from environment variables
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});


module.exports = pool;
