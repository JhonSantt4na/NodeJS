const jwt = require('jsonwebtoken')
const User = require('../model/User')

// Configs dotenv
require('dotenv').config()
const secret = process.env.SECRET

// get user by jwt token

const getUserByToken = async (token) => {
   if (!token) {
      return res.status(401).json({
         message: "Acesso Negado!"
      })
   }

   const decoded = jwt.verify(token, secret)
   const userId = decoded.id
   const user = await User.findOne({ _id: userId })

   return user
}

module.exports = getUserByToken