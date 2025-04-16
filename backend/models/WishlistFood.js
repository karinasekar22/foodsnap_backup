const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const WishlistFood = sequelize.define('WishlistFood', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  wishlist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_makanan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'wishlist_food',
  timestamps: false,
});


module.exports = WishlistFood;
