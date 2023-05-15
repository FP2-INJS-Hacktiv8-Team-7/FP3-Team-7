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
      return res.status(401).json(err)
    }
  }

  static async getAllCategories(req, res) {
    try {
      //how to get all the data from category
      //how to get the product data from categories
      const ambilkategori = await Category.findAll({include: Product})
      const kategori = ambilkategori.map((kategori)=>{
        return {
          id: kategori.id,
          type: kategori.type,
          sold_product_amount: kategori.sold_product_amount,
          createdAt: kategori.createdAt,
          updatedAt: kategori.updatedAt,
          Product: {
            id: kategori.Product.id,
            title: kategori.Product.title,
            price: kategori.Product.price,
            stock: kategori.Product.stock,
            CategoryId: kategori.Product.CategoryId,
            createdAt: kategori.Product.createdAt,
            updatedAt: kategori.Product.updatedAt,
          },
        }
      })
      if(kategori){
        return res.status(200).json({
          category: kategori,
        })
      }
    } catch (err) {
      res.status(500).json(err)
    }
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
