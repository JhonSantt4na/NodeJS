// Carregando Modulos
const express = require('express');
const hdbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash/lib/flash');

// Config Passport
const passport = require('passport')
require("./config/Auth")(passport)

// Rotas Imports
const usuarios = require('./routes/Usuario');
const admin = require('./routes/Admin')

// Schemas Imports
const Categoria = require('./models/Categoria')
const Postagem = require('./models/Postagem')

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

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Middleware
app.use((req, res, next) => {
   // Variaveis Globais: Usase em qualquer parte do codigo
   res.locals.error = req.flash('error')
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
app.get('/', (req, res) => {
   Postagem.find().populate("categoria").sort({ data: "desc" }).lean()
      .then((postagens) => {
         res.render('index', { postagens });
      }).catch(() => {
         req.flash("error_msg", "Houve um erro interno");
         res.redirect("/404");
      });
});

app.get('/postagem/:slug', (req, res) => {
   Postagem.findOne({ slug: req.params.slug }).lean()
      .then((postagem) => {
         if (postagem) {
            const post = {
               titulo: postagem.titulo,
               data: postagem.data,
               conteudo: postagem.conteudo
            }
            res.render('postagem/index', post);
         } else {
            req.flash("error_msg", "Esta Postagem não existe!");
            res.redirect('/');
         }
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro interno");
         res.redirect('/');
      });
});

app.get('/categorias', (req, res) => {
   Categoria.find().lean().then((categoria) => {
      res.render('categorias/index', { categoria })
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno ao iniciar as categorias")
      res.redirect('/')
   })
})

app.get('/categorias/:slug', (req, res) => {
   Categoria.findOne({ slug: req.params.slug }).lean()
      .then((categoria) => {
         if (categoria) {

            // Busca postagens que pertencem à categoria encontrada
            Postagem.find({ categoria: categoria._id }).lean()
               .then((postagens) => {
                  res.render('categorias/postagens', {
                     postagens: postagens, // Passando as postagens
                     categoria: categoria  // Passando a categoria
                  });
               })
               .catch((err) => {
                  req.flash("error_msg", "Houve um erro ao listar os posts!");
                  res.redirect('/');
               });

         } else {
            req.flash("error_msg", "Esta categoria não existe");
            res.redirect('/');
         }
      })
      .catch((err) => {
         req.flash("error_msg", "Houve um erro interno ao listar as categorias");
         res.redirect('/');
      });
});

app.get('/404', (req, res) => {
   res.send('Erro 404!')
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

// Outros
const PORT = 3000
app.listen(PORT, () => {
   console.log('Server is Runing!')
})