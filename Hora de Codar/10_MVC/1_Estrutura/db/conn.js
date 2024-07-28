const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.DB_HOST
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbs = process.env.DB_DBS

const sequelize = new Sequelize(dbs, user, pass, {
    host: host,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Conectamos ao MySQL !')

} catch (err) {
    console.log(`Não foi Possivel Conectar: ${err}`)
}

exports.default = sequelize;