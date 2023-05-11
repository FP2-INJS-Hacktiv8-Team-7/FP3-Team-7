"use strict"
const { Model } = require("sequelize")
const { hashPassword } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category)
      this.hasMany(models.TransactionHistory)
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Fullname is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email has been used, try another",
        },
        validate: {
          isEmail: true,

          notEmpty: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },

          len: [6, 10],
          // min: 6,
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Gender is required",
          },

          isIn: [["male", "female"]],
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "customer"),
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Role is required",
          },

          isIn: [["admin", "customer"]],
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Balance is required",
          },

          isNumeric: true,
          max: 100000000,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          const hashedPassword = hashPassword(user.password)
          user.password = hashedPassword
          user.role = "customer"
          user.balance = 0
        },
      },
    }
  )
  return User
}
