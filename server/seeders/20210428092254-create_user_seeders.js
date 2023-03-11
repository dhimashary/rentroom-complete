"use strict";
const bcryptjs = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync("qwerty123", salt);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "dhimas@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
