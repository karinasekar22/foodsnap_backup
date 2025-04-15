const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ItemMakanan = require('./ItemMakanan');
const ItemWishlist = require('./Wishlist');

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

WishlistFood.belongsTo(ItemWishlist, { foreignKey: 'wishlist_id' });
WishlistFood.belongsTo(ItemMakanan, { foreignKey: 'item_makanan_id' });

module.exports = WishlistFood;
