const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import Sequelize instance

const User = sequelize.define('User', {
  google_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
}, {
  tableName: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt
  createdAt: 'createdat', // Explicitly map createdAt to createdat
  updatedAt: 'updatedat', // Explicitly map updatedAt to updatedat
});

module.exports = User;

