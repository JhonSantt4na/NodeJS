const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importa o modelo Categoria
const Categoria = require('../models/Categoria');

// Rotas
router.get('/', (req, res) => {
   res.render('admin/index');
});

router.get('/posts', (req, res) => {
   res.send('Página de posts');
});

router.get('/categorias', (req, res) => {
   Categoria.find().sort({ date: 'desc' }).lean()
      .then((categorias) => {
         res.render('admin/categorias', { categorias });
      })
      .catch((err) => {
         req.flash("error_msg", "Houve um Erro ao Listar as Categorias");
         res.redirect('/admin');
      });
});

router.post('/categorias/nova', (req, res) => {
   // Validações
   let erros = [];
   const nome = req.body.nome;
   const slug = req.body.slug;

   if (!nome || typeof nome === undefined || nome == null) {
      erros.push({ texto: "Nome Inválido" });
   }

   if (!slug || typeof slug === undefined || slug == null) {
      erros.push({ texto: "Slug Inválido" });
   }

   if (nome.length < 2) {
      erros.push({ texto: "Nome da Categoria é muito pequeno!" });
   }

   if (erros.length > 0) {
      return res.render("admin/addcategorias", { erros: erros });
   } else {
      // Criando a Categoria
      const novaCategoria = {
         nome,
         slug
      };

      new Categoria(novaCategoria)
         .save()
         .then(() => {
            req.flash("success_msg", "Categoria Criada com Sucesso!");
            res.redirect('/admin/categorias');
         })
         .catch((err) => {
            req.flash("error_msg", "Houve um Erro ao Salvar a Categoria, Tente Novamente!");
            res.redirect('/admin');
         });
   }
});

router.get('/categorias/add', (req, res) => {
   res.render('admin/addcategorias');
});

module.exports = router;