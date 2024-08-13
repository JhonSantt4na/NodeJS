const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const SECRET = process.env.SECRET


// get user by jwt token
const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }

    const decoded = jwt.verify(token, SECRET)
    const userId = decoded.id
    const user = await User.findOne({ _id: userId })
    return user
}

module.exports = getUserByToken