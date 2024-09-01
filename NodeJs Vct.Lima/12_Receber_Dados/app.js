const express = require('express');
const hdbs = require('express-handlebars')
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config()

const host = process.env.DB_HOST
const pass = process.env.DB_PASS
const user = process.env.DB_USER
const dbs = process.env.DB_DBS
const app = express()

// Middleware para parsing de JSON e parsing de dados URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Express com o Template Engine
app.engine('handlebars', hdbs.engine({ defaultLayout: 'main' }))
// Definindo o handlebars como templete em uso
app.set('view engine', 'handlebars')

// Conexão DB
const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
})

// Criando Rotas
app.get('/cadastro', (req, res) => {
   // Redenrizando o formulario
   res.render('formulario')
})

// post so pode ser acessada por req methodo post ou seja formularios
app.post('/add', (req, res) => {
   res.send(`Titulo: ${req.body.titulo}, Conteudo: ${req.body.conteudo}`)
})

app.listen(3000, () => {
   console.log('Servidor rodando em: http://localhost:3000')
})