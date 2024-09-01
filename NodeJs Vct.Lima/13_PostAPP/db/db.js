const Sequelize = require('sequelize');
require('dotenv').config()

const host = process.env.DB_HOST
const pass = process.env.DB_PASS
const user = process.env.DB_USER
const dbs = process.env.DB_DBS

// Conexão DB
const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
})

module.exports = {
   Sequelize: Sequelize,
   sequelize: sequelize
}
