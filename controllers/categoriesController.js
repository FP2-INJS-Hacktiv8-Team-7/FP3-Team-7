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
          Products: {
            id: kategori.Products.id,
            title: kategori.Products.title,
            price: kategori.Products.price,
            stock: kategori.Products.stock,
            CategoryId: kategori.Products.CategoryId,
            createdAt: kategori.Products.createdAt,
            updatedAt: kategori.Products.updatedAt,
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
      let CategoryId = req.params.categoryId
      const hapus = await Category.destroy({
        where: {
          id: CategoryId
        },
      })
      if(hapus){
        return res.status(200).json({
          message: "Category has been sucessfully deleted"
        })
      }else{
        return res.status(404).json({
          message: `Category with id ${CategoryId} does not exist`
        })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = CategoriesController
