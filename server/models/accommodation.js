"use strict";
const { Model } = require("sequelize");
const getHistoryFormat = require("../helpers/getHistoryFormat");
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
      Accommodation.hasMany(models.Bookmark, {
        foreignKey: "accommodationId",
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
  Accommodation.afterCreate(async (accommodation, options) => {
    try {
      const historyOption = getHistoryFormat(accommodation, options.updateBy, {
        status: "create",
      });
      await sequelize.models.History.create(historyOption);
      return accommodation.reload();
    } catch (error) {
      throw error;
    }
  });
  Accommodation.addHook(
    "afterDestroy",
    "writeDeleteHistory",
    async (accommodation, options) => {
      try {
        const historyOption = getHistoryFormat(
          accommodation,
          options.updateBy,
          {
            status: "delete",
          }
        );
        await sequelize.models.History.create(historyOption);
      } catch (error) {
        throw error;
      }
    }
  );
  Accommodation.addHook(
    "beforeUpdate",
    "writeUpdateHistory",
    async (accommodation, options) => {
      try {
        let description = {};
        if (options.from === "PUT") {
          description.status = "put";
        } else if (options.from === "PATCH") {
          description.status = "patch";
          description.oldStatus = accommodation._previousDataValues.status;
          description.newStatus = accommodation.status;
        }
        const historyOption = getHistoryFormat(
          accommodation,
          options.updateBy,
          description
        );
        await sequelize.models.History.create(historyOption);
      } catch (error) {
        throw error;
      }
    }
  );
  return Accommodation;
};
