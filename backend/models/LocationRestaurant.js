const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationRestaurant = sequelize.define('LocationRestaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'locations',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'restorans',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'location_restaurant',
  createdAt: false,
  updatedAt: false,
  timestamps: false
});

module.exports = LocationRestaurant;
