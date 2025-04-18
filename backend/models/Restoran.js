const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Location = require('./Location');

const Restoran = sequelize.define('Restoran', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  banner_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },  
  restaurant_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  business_info: DataTypes.TEXT,
  ppn: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  open_at: DataTypes.DATE,
  closed_at: DataTypes.DATE,
  is_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'restoran',
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Restoran;
