const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ItemMakanan = require('./ItemMakanan');

const Kategori = sequelize.define('Kategori', {
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
  tableName: 'kategori',
  timestamps: false
});

// Relasi one-to-many: Satu kategori bisa punya banyak item makanan
Kategori.hasMany(ItemMakanan, { foreignKey: 'kategori_id' });

module.exports = Kategori;
