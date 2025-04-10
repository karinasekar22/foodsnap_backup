const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Username tidak boleh kosong' },
      len: {
        args: [3, 50],
        msg: 'Username harus 3 - 50 karakter'
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Email tidak valid' },
      notEmpty: { msg: 'Email tidak boleh kosong' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'Password minimal 6 karakter'
      }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'customer', 'umkm'),
    defaultValue: 'customer'
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'update_at',
  paranoid: true,            // Soft delete
  deletedAt: 'deleted_at'    // Kolom ini akan otomatis ditambahkan
});

module.exports = User;
