const express = require('express');
const Sequelize = require('sequelize')
require('dotenv').config()

const host = process.env.DB_HOST
const pass = process.env.DB_PASS
const user = process.env.DB_USER
const dbs = process.env.DB_DBS

//concetar ao banco
const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
})

sequelize.authenticate().then(() => {
   console.log('Conectado ao Banco de Dados')
}).catch((err) => {
   console.log('Erro ao conectar ao Banco de Dados', err)
})

const app = express()

app.use(express.json())

app.listen(3000, () => {
   console.log('Server is Running in http://localhost:3000')
})