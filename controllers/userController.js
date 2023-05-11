const { User } = require("../models")
const { generateToken } = require("../helpers/jwt")
const currencyFormatter = require("currency-formatter")
const { comparePassword } = require("../helpers/bcrypt")

class UserController {
  // Register User
  static async registerUser(req, res) {
    try {
      let role
      let balance
      const { full_name, password, gender, email } = req.body
      let data = {
        full_name,
        email,
        password,
        gender,
        role,
        balance,
      }

      const duplicatedEmail = await User.findOne({ where: { email: email } })
      if (duplicatedEmail) {
        return res.status(401).json({
          message: "Email has been used, try another one",
        })
      }
      const newUser = await User.create(data, {
        returning: true,
      })

      const convertBalancetoIDR = currencyFormatter.format(newUser.balance, {
        code: "IDR",
      })
      return res.status(201).json({
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          gender: newUser.gender,
          balance: convertBalancetoIDR,
          createdAt: newUser.createdAt,
        },
      })
    } catch (err) {
      res.status(401).json(err)
      console.log(err)
    }
  }

  // Login User
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw {
          name: "User Login Error",
          devMessage: "User not found!",
        }
      }
      const isCorrect = comparePassword(password, user.password)
      if (!isCorrect) {
        throw {
          name: "User login Error",
          devMessage: `User's password with email "${user.email}" does not match`,
        }
      }

      let payload = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      }
      const token = generateToken(payload)
      res.status(200).json({
        token: token,
      })
    } catch (err) {
      console.log(err)
      res.status(401).json(err)
    }
  }

  // Update User
  static async updateUser(req, res) {
    try {
      const userId = res.locals.user.id
      const { full_name, email } = req.body

      // check if user with userId was already exist in database
      const checkUserId = await User.findOne({ where: { id: userId } })
      if (!checkUserId) {
        return res.status(401).json({
          message: `User with userId ${userId} does not found`,
        })
      }

      // check if user does not edit the email
      if (email === checkUserId.email) {
        const updatedUser = await User.update(
          { full_name, email },
          {
            where: {
              id: userId,
            },
            returning: ["*"],
          }
        )
        // success result
        if (updatedUser) {
          return res.status(200).json({
            user: {
              id: updatedUser[1][0].id,
              full_name: updatedUser[1][0].full_name,
              email: updatedUser[1][0].email,
              createdAt: updatedUser[1][0].createdAt,
              updatedAt: updatedUser[1][0].updatedAt,
            },
          })
        }
      }

      // check duplicate email
      const duplicatedEmail = await User.findOne({ where: { email: email } })
      if (duplicatedEmail) {
        return res.status(401).json({
          message: "Email has been used, try another one",
        })
      }

      const updatedUser = await User.update(
        { full_name, email },
        {
          where: {
            id: userId,
          },
          returning: ["*"],
        }
      )
      // success result
      if (updatedUser) {
        return res.status(200).json({
          user: {
            id: updatedUser[1][0].id,
            full_name: updatedUser[1][0].full_name,
            email: updatedUser[1][0].email,
            createdAt: updatedUser[1][0].createdAt,
            updatedAt: updatedUser[1][0].updatedAt,
          },
        })
      }
    } catch (err) {
      console.log(err)
      res.status(401).json(err)
    }
  }

  // Delete User
  static async deleteUser(req, res) {
    try {
      const userId = res.locals.user.id
      const deletedUser = await User.destroy({ where: { id: userId } })
      if (deletedUser) {
        res.status(200).json({
          message: "Your account has been successfully deleted",
        })
      }
    } catch (err) {
      console.log(err)
      res.status(401).json(err)
    }
  }

  // TopUp User
  static async topUpUser(req, res) {
    try {
      const userId = res.locals.user.id
      const getCurrentlyUserBalance = res.locals.user.balance
      const { balance } = req.body

      if (balance < 0) {
        return res.status(401).json({
          message: "Topup Error!",
        })
      }
      const newBalance = balance + getCurrentlyUserBalance
      const userTopup = await User.update(
        { balance: newBalance },
        {
          where: {
            id: userId,
          },
        }
      )
      if (userTopup) {
        const convertBalancetoIDR = currencyFormatter.format(newBalance, {
          code: "IDR",
        })
        return res.status(200).json({
          message: `Your balance has been successfully updated to ${convertBalancetoIDR}`,
        })
      }
    } catch (err) {
      console.log(err)
      res.status(401).json(err)
    }
  }
}

module.exports = UserController
