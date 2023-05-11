const express = require("express")
const app = express()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  topUpUser,
} = require("../controllers/userController")
const authentication = require("../middlewares/authentication")

app.post("/register", registerUser)
app.post("/login", loginUser)
app.use(authentication)
app.put("/", updateUser)
app.delete("/", deleteUser)
app.patch("/topup", topUpUser)

module.exports = app
