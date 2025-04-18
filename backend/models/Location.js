const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restoran = require('./Restoran');

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'location',
  timestamps: false
});


module.exports = Location;
