"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
const axios = require("axios");

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
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "https://avatars.dicebear.com/api/bottts/hardim.svg?background=%230000ff",
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    try {
      const username = user.email.split("@")[0]
      console.log(username)
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(user.password, salt);
      user.password = hashedPassword;
      if (user.role === "customer") {
        user.avatar = `https://avatars.dicebear.com/api/bottts/${username}.svg?background=%230000ff`
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  });
  return User;
};
