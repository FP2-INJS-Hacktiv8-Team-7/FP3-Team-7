const { Product } = require("../models")
const currencyFormatter = require("currency-formatter")

class ProductsController {
  static async createProduct(req, res) {
    try {
      const {
        title,
        price,
        stock,
        CategoryId
      } = req.body
      console.log(req.body);
      const data = {
        title,
        price,
        stock,
        CategoryId
      }
      const newProduct = await Product.create(data, {
        returning: true,
      })
      return res.status(201).json(newProduct)

    } catch (err) {
      res.status(401).json(err)
      console.log(err)
    }
  }

  static async getAllProducts(req, res) {
    try {
      let products = await Product.findAll()
      //products.price = currencyFormatter.format(products.price, {
      //  code: "IDR",
      //})
      if (products) {
        res.status(200).json({ products })
      }
    } catch (err) {
      res.status(401).json(err)
      console.log(err)
    }
  }

  static async updateProduct(req, res) {
    try {
      const {
        title,
        stock,
        price
      } = req.body
      const productid = req.params.id
      console.log(req.body);
      console.log(req.params.id);
      const data = {
        title,
        price,
        stock
      }
      const newProduct = await Product.update(data, {
        where: {
          id: productid,
        },
        returning: true,
      })
      return res.status(201).json({
        product: newProduct[1][0]
      })
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async updateProductCategory(req, res) {
    try {
      const {
        CategoryId
      } = req.body
      const productid = req.params.id
      console.log(req.body);
      console.log(req.params.id);
      const data = {
        CategoryId
      }
      const newProduct = await Product.update(data, {
        where: {
          id: productid,
        },
        returning: true,
      })
      return res.status(201).json({
        product: newProduct[1][0]
      })
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id
      const isdeleted = await Product.destroy({
        where: { id: productId },
      })

      if (isdeleted) {
        return res.status(200).json({
          message: "Product has been successfully deleted",
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json(err)
    }
  }
}

module.exports = ProductsController
