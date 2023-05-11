"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Categories", {
      fields: ["UserId"],
      type: "foreign key",
      name: "category_id_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Categories", "category_id_fk")
  },
}
