"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("TransactionHistories", {
      fields: ["ProductId"],
      type: "foreign key",
      name: "transactionHistory_photoid_fk",
      references: {
        table: "Products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })

    await queryInterface.addConstraint("TransactionHistories", {
      fields: ["UserId"],
      type: "foreign key",
      name: "transactionHistory_userid_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "TransactionHistories",
      "transactionHistory_photoid_fk"
    )
    await queryInterface.removeConstraint(
      "TransactionHistories",
      "transactionHistory_userid_fk"
    )
  },
}
