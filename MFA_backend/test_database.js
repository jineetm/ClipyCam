require('dotenv').config(); // Load environment variables
const pool = require('./database'); // Import your database connection

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // Simple query to test connection
    console.log('Database connected:', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err.message);
  } finally {
    pool.end(); // Close the connection pool
  }
}

testConnection();
