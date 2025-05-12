const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const WishlistFood = require('./WishlistFood');

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
  underscored: true,
  timestamps: false,
});

module.exports = Wishlist;
