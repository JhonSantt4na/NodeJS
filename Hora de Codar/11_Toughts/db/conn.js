const { Sequelize } = require('sequelize');
require('dotenv').config()

const DB_DBS = process.env.DB_DBS;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_DBS, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log("Conectamos Com Sucesso !")
} catch (err) {
    console.log('Não Foi Possivel Conectar:', err)
}

module.exports = sequelize;