const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Importa o modelo Categoria
const Categoria = require('../models/Categoria');
const Postagem = require('../models/Postagem');


// Rotas
router.get('/', (req, res) => {
   Postagem.find().populate("categoria").sort({ data: "desc" }).lean()
      .then((postagens) => {
         res.render('index', { postagens });
      }).catch(() => {
         req.flash("error_msg", "Houve um erro interno");
         res.redirect("/404");
      });
});

router.get('/404', (req, res) => {
   res.send('Erro 404!')
})

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

router.get('/categorias/edit/:id', (req, res) => {
   Categoria.findOne({ _id: req.params.id }).lean()
      .then((categoria) => {
         res.render('admin/editcategorias', { categoria });
      }).catch((err) => {
         console.log(err)
         req.flash("error_msg", "Essa Categorias não existe, Tente Novamente!");
         res.redirect('/admin/categorias');
      })

})

router.post('/categorias/edit', (req, res) => {
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

router.post('/categorias/deletar', (req, res) => {
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

router.get('/postagens', (req, res) => {
   Postagem.find().lean()
      .populate("categoria")
      .sort({ data: 'desc' })
      .then((postagens) => {
         res.render('admin/postagens', { postagens })
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao listar postagens")
         res.redirect('/admin')
      })

})

router.get('/postagem/:slug', (req, res) => {
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

router.get('/postagens/add', (req, res) => {
   Categoria.find().lean()
      .then((categorias) => {
         res.render('admin/addpostagens', { categorias })
      })
      .catch((err) => {
         req.flash("error_msg", "Houve um erro ao carregar o Formulário")
         res.redirect('/admin')
      })
})

router.post('/postagens/nova', (req, res) => {
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

router.get('/postagens/edit/:id', (req, res) => {
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

router.post('/postagens/edit', (req, res) => {
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

router.get('/postagens/deletar/:id', (req, res) => {
   Postagem.deleteOne({ _id: req.params.id }).then(() => {
      req.flash('success_msg', "Postagem deletada com sucesso!")
      res.redirect('/admin/postagens')
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno")
      res.redirect('/admin/postagens')
   })
})

module.exports = router;