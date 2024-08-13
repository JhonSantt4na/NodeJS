const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()


const SECRET = process.env.SECRET

const createUserToken = async (user, req, res) => {
    // Create a Token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, SECRET)

    // Return Token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken