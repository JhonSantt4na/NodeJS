const Sequelize = require('sequelize');

require('dotenv').config();

const host = process.env.DB_HOST
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbs = process.env.DB_DBS

const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
});

module.exports = sequelize