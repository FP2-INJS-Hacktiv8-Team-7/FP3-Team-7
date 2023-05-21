"use strict"
const { Model } = require("sequelize")
const currencyFormatter = require("currency-formatter")

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category)
      this.hasMany(models.TransactionHistory)
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
          notNull: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        //get() ini isinya agar hasil querynya udah diconvert ke IDR dlu sebelum di return ke controller
        //tp bikin urutannya jd price dlu baru id
        get() {
          const rawValue = this.getDataValue('price');
          let convertBalancetoIDR = currencyFormatter.format(rawValue, {
            code: "IDR",
          })
          return convertBalancetoIDR;
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
          notNull: {
            args: true,
            msg: "Price is required",
          },
          isNumeric: true,
          max: 50000000,
          min: 0,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock is required",
          },
          notNull: {
            args: true,
            msg: "Stock is required",
          },
          isNumeric: true,
          min: 5,
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "CategoryId is required",
          },
          notNull: {
            args: true,
            msg: "CategoryId is required",
          },
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  )
  return Product
}
