const express = require("express")
const app = express()
const router = require("./routers")
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log("Server is listening at PORT", PORT)
})
