"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Accommodation, {
        foreignKey: "authorId",
      });
      User.hasMany(models.Bookmark, {
        foreignKey: "customerId"
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [6, 13],
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isValid(value) {
            if (
              value !== "customer" &&
              value !== "admin" &&
              value !== "staff"
            ) {
              throw new Error(
                "Role can only be filled with admin, staff or customer"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(user.password, salt);
    user.password = hashedPassword;
  });
  return User;
};
