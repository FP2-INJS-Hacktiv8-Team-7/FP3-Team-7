const express = require("express")
const app = express()
const {
  createTransaction,
  getTransactionUser,
  getTransactionAdmin,
  getTransactionById,
} = require("../controllers/transactionHistoriesController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

app.use(authentication)
app.post("/", createTransaction)
app.get("/user", getTransactionUser)
app.use("/admin", authorization)
app.get("/admin", getTransactionAdmin)
app.use("/:id", authorization)
app.get("/:id", getTransactionById)

module.exports = app
