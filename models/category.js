"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product)
      this.belongsTo(models.User)
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Type has been used already",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Type is required",
          },
          notNull: {
            args: true,
            msg: "Type is required",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Sold Product Amount is required",
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
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        beforeCreate: (category, options) => {
          category.sold_product_amount = 0
        },
      },
    }
  )
  return Category
}
