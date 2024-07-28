const { Sequelize } = require('sequelize');
require('dotenv').config();

const DBS = process.env.DB_DBS;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DBS, USER, PASS, {
    host: HOST,
    dialect: 'mysql'
})

try {

    sequelize.authenticate()
    console.log(`Conectamos ao MySQL !`)

} catch (err) {

    console.log(`Não Foi Possivel Conectar: ${err}`)
}


exports.default = sequelize;