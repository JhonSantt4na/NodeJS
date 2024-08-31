const express = require('express');
const hdbs = require('express-handlebars')
const Sequelize = require('sequelize');
require('dotenv').config()

const host = process.env.DB_HOST
const pass = process.env.DB_PASS
const user = process.env.DB_USER
const dbs = process.env.DB_DBS
const app = express()

// Config Express com o Template Engine
app.engine('handlebars', hdbs.engine({ defaultLayout: 'main' }))
// Definindo o handlebars como templete em uso
app.set('view engine', 'handlebars')

// Conexão DB
const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
})

app.listen(3000, () => {
   console.log('Servidor rodando em: http://localhost:3000')
})