const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbs = process.env.DB_DBS

const sequelize = new Sequelize(dbs, user, pass, {
    host: host,
    dialect: 'mysql'
});

// Usando o metodo authenticate para conectar
// try {
//     sequelize.authenticate()
//     console.log('Conectamos com o Sequelize')
// } catch (err) {
//     console.log('Nâo Foi Possivel Conectar:', error);
// }

module.exports = sequelize