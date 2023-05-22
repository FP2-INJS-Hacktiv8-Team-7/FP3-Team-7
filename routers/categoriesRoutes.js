const express = require("express")
const app = express()
const {
  createCategories,
  getAllCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categoriesController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

app.use(authentication)
app.use("/:id", authorization)
app.patch("/:id", updateCategories)
app.delete("/:id", deleteCategories)
app.use(authorization)
app.post("/", createCategories)
app.get("/", getAllCategories)

module.exports = app
