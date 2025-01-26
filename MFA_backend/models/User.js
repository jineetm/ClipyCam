
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import Sequelize instance

const User = sequelize.define('User', {
  google_id: {
    type: DataTypes.BLOB, // Use BLOB to match BYTEA in PostgreSQL
    allowNull: false, // Cannot be null because it's critical for encryption
  },
  hashed_google_id: {
    type: DataTypes.STRING, // String type to store the hashed version (human-readable)
    allowNull: true, // Allow null initially (e.g., for backward compatibility)
  },
  email: {
    type: DataTypes.BLOB, // Use BLOB to match BYTEA in PostgreSQL
    allowNull: false, // Cannot be null because it's encrypted
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

