const dotenv = require('dotenv').config()

const usuario = process.env.USER
const senha = process.env.PASS

if (process.env.NODE_ENV == "production") {
   module.exports = { mongoURI: `mongodb+srv://${usuario}:${senha}@blogapp-prod.kuqoy.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp-Prod` }
} else {
   module.exports = { mongoURI: 'mongodb://localhost:27017/BlogApp' }
}