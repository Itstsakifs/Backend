const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define(
  "News",
  {
    id: {
      field: "id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    image: {
      field: "image",
      allowNull: false,
      type: DataTypes.STRING,
    },
    judul: {
      field: "judul",
      allowNull: false,
      type: DataTypes.STRING,
    },
    author: {
      field: "author",
      allowNull: false,
      type: DataTypes.STRING,
    },
    isi: {
      field: "isi",
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "createdAt",
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updatedAt",
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "news",
    timestamps: true,
  }
);

module.exports = News;
