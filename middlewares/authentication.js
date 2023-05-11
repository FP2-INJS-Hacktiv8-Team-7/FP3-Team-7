const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
  try {
    const token = req.get("token")
    const userDecoded = verifyToken(token)
    const user = await User.findOne({
      where: { id: userDecoded.id, email: userDecoded.email },
    })

    if (!user) {
      return res.status(401).json({
        name: "Authentication Error",
        devMessage: `User with email ${userDecoded.email} not found in database. `,
      })
    }
    res.locals.user = user
    return next()
  } catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
}

module.exports = authentication
