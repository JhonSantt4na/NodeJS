// Carregando Modulos
const express = require('express');
const hdbs = require('express-handlebars')
const mongoose = require('mongoose')
const admin = require('./routes/Admin')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash/lib/flash');

const app = express()

// Configurações
app.use(express.json())
app.use(express.urlencoded({
   extended: true
}))

// Session 
app.use(session({
   secret: 'ChaveParaGerarSessão',
   resave: true,
   saveUninitialized: true
}))
app.use(flash())
// Middleware
app.use((req, res, next) => {
   // Variaveis Globais: Usase em qualquer parte do codigo
   res.locals.success_msg = req.flash('success_msg')
   res.locals.error_msg = req.flash('error_msg')
   next() // Importante lembra do next()
})

// Mongoose
mongoose.connect('mongodb://localhost:27017/BlogApp')
   .then(() => {
      console.log('Conectado ao Mongo')
   })
   .catch((err) => {
      console.log('Erro Ao Conectar no Mongo', err)
   })

// Public
app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, 'views'));
// handlebars
app.engine('handlebars', hdbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Rotas
app.use('/admin', admin)

// Outros
const PORT = 3000
app.listen(PORT, () => {
   console.log('Server is Runing!')
})