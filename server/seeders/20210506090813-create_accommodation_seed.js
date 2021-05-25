"use strict";
const getSeedAccommodation = require("../helpers/getSeedAccommodation");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     * There must be atleast 1 admin before do this seed
     */
    await queryInterface.bulkInsert(
      "Accommodation",
      getSeedAccommodation(1),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Accommodation", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
