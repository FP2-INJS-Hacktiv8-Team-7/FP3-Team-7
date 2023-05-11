const { Category, Product, TransactionHistory } = require("../models")

function authorization(req, res, next) {
  const userRole = res.locals.user.role
  const url = req.baseUrl
  const id = req.params.id
  // console.log(url)

  if (url === `/categories/${id}` || url === "/categories") {
    if (url === "/categories") {
      if (userRole === "admin") {
        return next()
      } else {
        return res.status(404).json({
          name: "Authorization Error",
          devMessage:
            "Acces Denied, you does not have permission to access this route",
        })
      }
    }

    if (url === `/categories/${id}`) {
      if (userRole === "admin") {
        Category.findOne({ where: { id } })
          .then((result) => {
            if (!result) {
              return res.status(400).json({
                name: "Authorization Error",
                devMessage: "Data Not Found!",
              })
            }
            return next()
          })
          .catch((err) => {
            console.log(err)
            return res.status(400).json(err)
          })
      } else {
        return res.status(404).json({
          name: "Authorization Error",
          devMessage:
            "Acces Denied, you does not have permission to access this route",
        })
      }
    }
  } else if (url === `/products/${id}` || url === "/products") {
    if (url === `/products`) {
      if (userRole === "admin") {
        return next()
      } else {
        return res.status(404).json({
          name: "Authorization Error",
          devMessage:
            "Acces Denied, you does not have permission to access this route",
        })
      }
    }

    if (url === `/products/${id}`) {
      if (userRole === "admin") {
        Product.findOne({ where: { id } })
          .then((result) => {
            if (!result) {
              return res.status(400).json({
                name: "Authorization Error",
                devMessage: "Data Not Found!",
              })
            }
            return next()
          })
          .catch((err) => {
            console.log(err)
            return res.status(400).json(err)
          })
      } else {
        return res.status(404).json({
          name: "Authorization Error",
          devMessage:
            "Acces Denied, you does not have permission to access this route",
        })
      }
    }
  } else if (url === `/transactions/${id}` || url === "/transactions/admin") {
    const UserId = res.locals.user.id
    const fullName = res.locals.user.full_name
    // console.log(url)

    if (url === `/transactions/${id}`) {
      TransactionHistory.findOne({ where: { id } })
        .then((result) => {
          if (!result) {
            return res.status(400).json({
              name: "Authorization Error",
              devMessage: "Data Not Found!",
            })
          }

          if (UserId === result.UserId || userRole === "admin") {
            return next()
          } else {
            return res.status(400).json({
              name: "Authorization Error",
              devMessage: `User with name "${fullName}" does not have access permission to transaction "${id}"`,
            })
          }
        })
        .catch((err) => {
          console.log(err)
          return res.status(400).json(err)
        })
    }

    if (url === "/transactions/admin") {
      if (userRole !== "admin") {
        return res.status(404).json({
          name: "Authorization Error",
          devMessage:
            "Acces Denied, you does not have permission to access this route",
        })
      }
      return next()
    }
  } else {
    console.log(userRole)
    console.log(url)
    return res.status(400).json({
      code: "400",
      message: "Not Found",
    })
  }
}

module.exports = authorization
