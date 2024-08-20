const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const createUserToken = async (user, req, res) => {

   // Create a Token
   const token = jwt.sign({
      name: user.name,
      id: user._id
   }, secret)

   // Return Token
   res.status(200).json({
      message: "Você está Autenticado",
      token: token,
      userId: user._id
   })
}

module.exports = createUserToken