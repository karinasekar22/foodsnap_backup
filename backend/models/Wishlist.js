const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'wishlist',
  timestamps: false,
});

// Wishlist.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Wishlist;
