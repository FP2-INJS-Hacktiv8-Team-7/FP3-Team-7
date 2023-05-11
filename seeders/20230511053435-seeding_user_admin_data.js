"use strict"
const { hashPassword } = require("../helpers/bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          full_name: "admin",
          email: "admin@gmail.com",
          password: hashPassword("admin"),
          gender: "male",
          role: "admin",
          balance: 1000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        validate: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
