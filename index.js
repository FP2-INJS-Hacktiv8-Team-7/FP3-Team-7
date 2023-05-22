const express = require("express")
const app = express()
const router = require("./routers")
const PORT = process.env.PORT
const { sequelize } = require("./models")
const seederFiles = require("./seeders/20230511053435-seeding_user_admin_data")

const helmet = require("helmet")

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sync database schema
sequelize
  .sync()
  .then(() => {
    console.log(`Database schema synced`)
  })
  .catch((err) => {
    console.log("Error syncing database schema :", err)
    process.exit(1)
  })

app.use(router)

app.listen(PORT, () => {
  console.log("Server is listening at PORT", PORT)
})
