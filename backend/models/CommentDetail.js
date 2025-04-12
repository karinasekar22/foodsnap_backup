const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comment = require('./Comment');
const User = require('./User');

const CommentDetail = sequelize.define('CommentDetail', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'comment_detail',
  timestamps: false // atau true jika kamu punya createdAt/updatedAt
});

// Relasi
CommentDetail.belongsTo(Comment, { foreignKey: 'comment_id' });
CommentDetail.belongsTo(User, { foreignKey: 'user_id' });

module.exports = CommentDetail;
