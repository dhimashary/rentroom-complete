"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Types",
      [
        {
          name: "Guest House",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hotel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apartment",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hostel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
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
    await queryInterface.bulkDelete("Types", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
