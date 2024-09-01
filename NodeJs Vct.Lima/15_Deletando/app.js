const express = require('express');
const hdbs = require('express-handlebars')
const path = require('path');
const Post = require('./model/Post');
const { where } = require('sequelize');

const app = express()

// Middleware para parsing de JSON e parsing de dados URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Express com o Template Engine
app.engine('handlebars', hdbs.engine({
   defaultLayout: 'main', runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
   }
}))
// Definindo o handlebars como templete em uso
app.set('view engine', 'handlebars')

// Criando Rotas

app.get('/', (req, res) => {
   Post.findAll({ order: [['id', 'DESC']] }).then((posts) => { // com o then, o primeiro parameteo é os dados
      res.render('home', { posts: posts }) //Com isso passamos para a home
   })
})

app.get('/cadastro', (req, res) => {
   res.render('formulario')
})

app.post('/add', (req, res) => {
   Post.create({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo
   })
      .then(() => {
         // res.send('Post Criado com Sucesso!')
         res.redirect('/')
      })
      .catch((err) => {
         res.send('Houve um erro:' + err)
      })
})
app.get('/deletar/:id', (req, res) => {
   Post.destroy({ where: { 'id': req.params.id } })
      .then(() => {
         res.send('Postagem deletada com sucesso!')
      })
      .catch((err) => {
         res.send('Está postagem não existe!')
      })
})
app.listen(3000, () => {
   console.log('Servidor rodando em: http://localhost:3000')
})