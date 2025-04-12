const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ItemMakanan = require('./ItemMakanan');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_makanan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'comment',
  timestamps: false
});

Comment.belongsTo(ItemMakanan, { foreignKey: 'item_makanan_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Comment;
