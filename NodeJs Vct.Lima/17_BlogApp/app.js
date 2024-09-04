// Carregando Modulos
const express = require('express');
const hdbs = require('express-handlebars')
const mongoose = require('mongoose')
const admin = require('./routes/Admin')
const path = require('path')

const app = express()

// Configurações
app.use(express.json())
app.use(express.urlencoded({
   extended: true
}))
// Public
app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, 'views'));
// handlebars
app.engine('handlebars', hdbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Mongoose

// Rotas
app.use('/admin', admin)

// Outros
const PORT = 3000
app.listen(PORT, () => {
   console.log('Server is Runing!')
})