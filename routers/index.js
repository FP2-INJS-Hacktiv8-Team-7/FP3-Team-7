const router = require("express").Router()
const userRoutes = require("./userRoutes")
const categoriesRoutes = require("./categoriesRoutes")
const productsRoutes = require("./productRoutes")
const transactionHistoriesRoutes = require("./transactionHistoriesRoutes")

router.use("/users", userRoutes)
router.use("/categories", categoriesRoutes)
router.use("/products", productsRoutes)
// router.use("/transactions", transactionHistoriesRoutes)
router.use("*", (req, res) => {
  return res.status(400).json({
    code: 400,
    name: "Error",
    message: "Not Found",
  })
})

module.exports = router
