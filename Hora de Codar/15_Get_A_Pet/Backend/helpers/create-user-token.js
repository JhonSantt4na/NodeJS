const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET

const createUserToken = async (user, req, res) => {

   // Create a token
   const token = jwt.sign({
      name: user.name,
      id: user._id
   }, secret)

   // Return token
   res.status(200).json({
      message: "Você está autenticado",
      token: token,
      userId: user._id
   })
}

module.exports = createUserToken