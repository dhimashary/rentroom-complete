"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        foreignKey: "customerId",
      });
      Bookmark.belongsTo(models.Accommodation, {
        foreignKey: "accommodationId",
      });
    }
  }
  Bookmark.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
        primaryKey: true
      },
      accommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
        primaryKey: true
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
