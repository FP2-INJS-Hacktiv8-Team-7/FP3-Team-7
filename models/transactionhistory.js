"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product)
      this.belongsTo(models.User)
    }
  }
  TransactionHistory.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "ProductId is required",
          },
          notNull: {
            args: true,
            msg: "ProductId is required",
          },
          isNumeric: true,
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "UserId is required",
          },
          notNull: {
            args: true,
            msg: "UserId is required",
          },
          isNumeric: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Quantity is required",
          },
          notNull: {
            args: true,
            msg: "Quantity is required",
          },
          isNumeric: true,
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Total Price is required",
          },
          notNull: {
            args: true,
            msg: "Total Price is required",
          },
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  )
  return TransactionHistory
}
