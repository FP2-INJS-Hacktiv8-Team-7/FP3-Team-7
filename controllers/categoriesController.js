const { Category, Product } = require("../models")

class CategoriesController {
  static async createCategories(req, res) {
    const { type } = req.body
    try {
      let sold_product_amount
      const UserId = res.locals.user.id
      console.log(UserId)
      const category = await Category.create({
        type,
        sold_product_amount,
        UserId,
      })

      if (category) {
        return res.status(201).json({
          category: {
            id: category.id,
            type: category.type,
            updatedAt: category.updatedAt,
            createdAt: category.createdAt,
            sold_product_amount: category.sold_product_amount,
          },
        })
      }
    } catch (err) {
      console.log(err)
      if (err) {
        return res.status(401).json({
          name: "Validation Error",
          message: err.message,
        })
      }
    }
  }

  static async getAllCategories(req, res) {
    try {
    } catch (err) {}
  }

  static async updateCategories(req, res) {
    try {
    } catch (err) {}
  }

  static async deleteCategories(req, res) {
    try {
    } catch (err) {}
  }
}

module.exports = CategoriesController
