const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Nutrition = sequelize.define(
  "Nutrition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_makanan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sugar: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "nutrition",
    timestamps: false,
  }
);

module.exports = Nutrition;
