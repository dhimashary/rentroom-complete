"use strict";
const { Model } = require("sequelize");
const createError = require("http-errors");

module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.Type, {
        foreignKey: "typeId",
      });
      Accommodation.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Accommodation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      facility: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      roomCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
        validate: {
          notNull: true,
          notEmpty: true,
          isValid(value) {
            if (
              value !== "active" &&
              value !== "inactive" &&
              value !== "archived"
            ) {
              throw createError(
                400,
                "Status can only be filled with active, inactive, or archived"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Accommodation",
    }
  );
  Accommodation.afterCreate((accomodation) => {
    return accomodation.reload();
  });
  return Accommodation;
};
