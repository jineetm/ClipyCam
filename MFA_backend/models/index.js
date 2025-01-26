const { Sequelize } = require('sequelize');

// Configure Sequelize to connect to the database
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/ClipyCam',
  {
    dialect: 'postgres',
    logging: false, // Disable query logging in the console
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

// Export the Sequelize instance for use in other files
module.exports = sequelize;
