const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Importar os Schema
const Usuarios = require('../models/Usuario');
const Usuario = require('../models/Usuario');

// Rotas
router.get('/registro', (req, res) => {
   res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {
   let erros = []
   let { nome, email, senha, senha2 } = req.body;

   if (!nome || typeof nome == undefined || nome == null) {
      erros.push({ texto: "Nome Inválido" })
   }

   if (!email || typeof email == undefined || email == null) {
      erros.push({ texto: "Email Inválido" })
   }

   if (!senha || typeof senha == undefined || senha == null) {
      erros.push({ texto: "Senha Inválido" })
   }

   if (senha.length < 4) {
      erros.push({ texto: "Senha muito curta" })
   }

   if (senha != senha2) {
      erros.push({ texto: "As Senhas São Diferentes" })
   }

   if (erros.length > 0) {
      res.render("usuarios/registro", { erros })

   } else {
      Usuarios.findOne({ email: email })
         .then((usuario) => {
            if (usuario) {
               req.flash("error_msg", "Email Já Usado!")
               res.redirect("/usuarios/registro")
            } else {
               const novoUsuario = new Usuario({
                  nome,
                  email,
                  senha
               })

               bcrypt.genSalt(10, (erro, salt) => {
                  bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                     if (erro) {
                        req.flash("error_msg", "Houve um erro ao Salvar")
                        res.redirect('/')
                     }

                     novoUsuario.senha = hash
                     novoUsuario.save()
                        .then(() => {
                           req.flash("success_msg", "Usuario Criado Com Sucesso!")
                           res.redirect('/')
                        })
                        .catch(() => {
                           req.flash("error_msg", "Houve um erro ao criar o Usuario")
                           res.redirect('/usuarios/registros')
                        })
                  })

               })
            }
         })
         .catch((err) => {
            req.flash("erro_msg", "Houve um erro interno")
            res.redirect('/')
         })
   }

})

router.get('/login', (req, res) => {
   res.render("usuarios/login")
})

module.exports = router