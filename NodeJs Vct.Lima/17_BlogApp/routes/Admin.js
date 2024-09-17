const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Importa Schemas
const Categoria = require('../models/Categoria');
const Postagem = require('../models/Postagem');

// Is Admin?
const { eAdmin } = require('../helpers/isAdmin')


// Rotas
router.get('/', eAdmin, (req, res) => {
   res.render('admin/index')
})

router.get('/categorias', eAdmin, (req, res) => {
   Categoria.find().sort({ date: 'desc' }).lean()
      .then((categorias) => {
         res.render('admin/categorias', { categorias });
      })
      .catch((err) => {
         req.flash("error_msg", "Houve um Erro ao Listar as Categorias");
         res.redirect('/admin/categorias');
      });
});

router.post('/categorias/nova', eAdmin, (req, res) => {
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
            res.redirect('/');
         });
   }
});

router.get('/categorias/add', eAdmin, (req, res) => {
   res.render('admin/addcategorias');
});

router.get('/categorias/edit/:id', eAdmin, (req, res) => {
   Categoria.findOne({ _id: req.params.id }).lean()
      .then((categoria) => {
         res.render('admin/editcategorias', { categoria });
      }).catch((err) => {
         console.log(err)
         req.flash("error_msg", "Essa Categorias não existe, Tente Novamente!");
         res.redirect('/admin/categorias');
      })

})

router.post('/categorias/edit', eAdmin, (req, res) => {
   Categoria.findOne({ _id: req.body.id })
      .then((categoria) => {
         categoria.nome = req.body.nome
         categoria.slug = req.body.slug
         categoria.save().then(() => {
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/categorias')
         }).catch((err) => {
            req.flash('error_msg', "Houve um erro ao salvar a edição da categoria")
            res.redirect('/admin/categorias')
         })
      })
      .catch((err) => {
         console.log(err)
         req.flash("error_msg", "Houve um erro ao Editar a Categoria, Tente Novamente!");
         res.redirect('/admin/categorias');
      })
})

router.post('/categorias/deletar', eAdmin, (req, res) => {
   Categoria.deleteOne({ _id: req.body.id })
      .then(() => {
         req.flash("success_msg", "Categoria Deletada com sucesso !");
         res.redirect('/admin/categorias');
      }).catch((err) => {
         console.log(err)
         req.flash("error_msg", "Houve um erro ao Deletar a categoria, Tente Novamente!");
         res.redirect('/admin/categorias');
      })
})

router.get('/postagens', eAdmin, (req, res) => {
   Postagem.find().lean()
      .populate("categoria")
      .sort({ data: 'desc' })
      .then((postagens) => {
         res.render('admin/postagens', { postagens })
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao listar postagens")
         res.redirect('/')
      })

})

router.get('/postagens/add', eAdmin, (req, res) => {
   Categoria.find().lean()
      .then((categorias) => {
         res.render('admin/addpostagens', { categorias })
      })
      .catch((err) => {
         req.flash("error_msg", "Houve um erro ao carregar o Formulário")
         res.redirect('/')
      })
})

router.post('/postagens/nova', eAdmin, (req, res) => {
   let erros = []
   if (req.body.categoria == "0") {
      erros.push({ texto: "Categoria Inválida, Registre uma categoria" })
   }

   if (erros.length > 0) {
      res.render('admin/addpostagens', { erros: erros })
   } else {
      const novaPostagem = {
         titulo: req.body.titulo,
         slug: req.body.slug,
         descricao: req.body.descricao,
         conteudo: req.body.conteudo,
         categoria: req.body.categoria,
      }
      new Postagem(novaPostagem).save()
         .then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect('/admin/postagens')
         }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect('/admin/postagens')
         })
   }
})

router.get('/postagens/edit/:id', eAdmin, (req, res) => {
   Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {
      Categoria.find().lean().then((categorias) => {
         res.render('admin/editpostagens', {
            postagem: postagem,
            categorias: categorias
         })
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao listar as categorias")
         res.redirect('/admin/postagens')
      })
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar o formulério de edição")
      res.redirect('/admin/postagens')
   })
})

router.post('/postagens/edit', eAdmin, (req, res) => {
   Postagem.findOne({ _id: req.body.id })
      .then((postagem) => {
         postagem.titulo = req.body.titulo
         postagem.slug = req.body.slug
         postagem.descricao = req.body.slug
         postagem.conteudo = req.body.conteudo
         postagem.categoria = req.body.categoria

         postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
         }).catch((err) => {
            console.log(postagem)
            req.flash('error_msg', "Houve um erro ao salvar a edição da postagem")
            res.redirect('/admin/postagens')
         })
      })
      .catch((err) => {
         console.log(err)
         req.flash("error_msg", "Houve um erro ao Editar a postagem, Tente Novamente!");
         res.redirect('/admin/postagens');
      })
})

router.get('/postagens/deletar/:id', eAdmin, (req, res) => {
   Postagem.deleteOne({ _id: req.params.id }).then(() => {
      req.flash('success_msg', "Postagem deletada com sucesso!")
      res.redirect('/admin/postagens')
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno")
      res.redirect('/admin/postagens')
   })
})

module.exports = router;