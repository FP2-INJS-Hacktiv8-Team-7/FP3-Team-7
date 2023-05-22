const { Product, Category } = require("../models")
const currencyFormatter = require("currency-formatter")

class ProductsController {
  static async createProduct(req, res) {
    try {
      const { title, price, stock, CategoryId } = req.body
      let data = {
        title,
        price,
        stock,
        CategoryId,
      }
      const checkCategoryId = await Category.findOne({
        where: { id: CategoryId },
      })
      if (checkCategoryId) {
        const product = await Product.create(data)
        if (product) {
          product.price = currencyFormatter.format(product.price, {
            code: "IDR",
          })
          return res.status(201).json({
            product,
          })
        }
      } else {
        return res.status(401).json({
          name: "Failed",
          devMessage: "CategoryId does not exist",
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll()
      const eachProduct = products.map((product) => {
        product.price = currencyFormatter.format(product.price, {
          code: "IDR",
        })

        return {
          id: product.id,
          title: product.title,
          price: product.price,
          stock: product.stock,
          CategoryId: product.CategoryId,
          createdAt: product.createdAt,
          updateAt: product.updatedAt,
        }
      })

      if (products) {
        return res.status(200).json({
          products: eachProduct,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id
      const { price, stock, title } = req.body
      const product = await Product.update(
        { price, stock, title },
        {
          where: {
            id: productId,
          },
          returning: true,
        }
      )

      if (product[0] === 1) {
        product[1][0].price = currencyFormatter.format(product[1][0].price, {
          code: "IDR",
        })

        return res.status(200).json({
          product: product[1],
        })
      } else {
        return res.status(401).json({
          name: "Failed",
          devMessage: `Product with id ${productId} does not exist!`,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async updateProductCategory(req, res) {
    try {
      const { CategoryId } = req.body
      const productId = req.params.id
      const categoryIdCheck = await Category.findOne({
        where: {
          id: CategoryId,
        },
      })

      if (categoryIdCheck) {
        const product = await Product.update(
          { CategoryId },
          { where: { id: productId }, returning: true }
        )
        if (product) {
          return res.status(200).json({ product: product[1] })
        }
      } else {
        return res.status(401).json({
          name: "Failed",
          message: `CategoryId ${CategoryId} did not exist!`,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id
      const deletedProduct = await Product.destroy({ where: { id: productId } })
      if (deletedProduct) {
        return res.status(200).json({
          message: "Product has been successfully deleted",
        })
      } else {
        return res.status(401).json({
          name: "Failed",
          devMessage: `Product with id ${productId} did not exist!`,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }
}

module.exports = ProductsController
