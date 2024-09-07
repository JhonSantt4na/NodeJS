const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Importa o modelo Categoria
const Categoria = require('../models/Categoria')

// Rotas
router.get('/', (req, res) => {
   res.render('admin/index')
})

router.get('/posts', (req, res) => {
   res.send('Página de posts')
})

router.get('/categorias', (req, res) => {
   res.render('admin/categorias')
})

router.post('/categorias/nova', (req, res) => {
   const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
   }

   new Categoria(novaCategoria)
      .save()
      .then(() => {
         console.log('Categoria salva com sucesso!')
         res.redirect('/admin/categorias')
      })
      .catch((err) => {
         console.log('Erro ao criar categoria!')
         res.redirect('/admin/categorias')
      })
})

router.get('/categorias/add', (req, res) => {
   res.render('admin/addcategorias')
})

module.exports = router