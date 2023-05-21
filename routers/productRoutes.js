const express = require("express")
const app = express()
const {
  createProduct,
  getAllProducts,
  updateProduct,
  updateProductCategory,
  deleteProduct,
} = require("../controllers/productsController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

app.use(authentication)
app.get("/", getAllProducts)
app.use(authorization)
app.use("/:id", authorization)
app.put("/:id", updateProduct)
app.patch("/:id", updateProductCategory)
app.delete("/:id", deleteProduct)
app.post("/", createProduct)

module.exports = app
