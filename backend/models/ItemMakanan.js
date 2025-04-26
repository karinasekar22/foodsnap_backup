const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemMakanan = sequelize.define('ItemMakanan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restoran_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.TEXT
  },
  caption: {
    type: DataTypes.TEXT
  },

  description: {
    type: DataTypes.TEXT
  },
  rating: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  is_aktif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'item_makanan',
  timestamps: false
});

module.exports = ItemMakanan;
