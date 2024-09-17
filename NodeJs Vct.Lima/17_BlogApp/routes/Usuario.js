const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport')

// Importar os Schema
const Usuarios = require('../models/Usuario');
const Usuario = require('../models/Usuario');

// Rotas
router.get('/registro', (req, res) => {
   res.render('usuarios/registro')
})

router.post('/registro', async (req, res) => {
   let erros = [];
   let { nome, email, senha, senha2 } = req.body;

   if (!nome || typeof nome == undefined || nome == null) {
      erros.push({ texto: "Nome Inválido" });
   }

   if (!email || typeof email == undefined || email == null) {
      erros.push({ texto: "Email Inválido" });
   }

   if (!senha || typeof senha == undefined || senha == null) {
      erros.push({ texto: "Senha Inválido" });
   }

   if (senha.length < 4) {
      erros.push({ texto: "Senha muito curta" });
   }

   if (senha != senha2) {
      erros.push({ texto: "As Senhas São Diferentes" });
   }

   if (erros.length > 0) {
      res.render("usuarios/registro", { erros });
   } else {
      try {
         const usuario = await Usuarios.findOne({ email: email });
         if (usuario) {
            req.flash("error_msg", "Email Já Usado!");
            res.redirect("/usuarios/registro");
         } else {
            const novoUsuario = new Usuario({ nome, email, senha });
            const salt = await bcrypt.genSalt(10);
            novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, salt);

            await novoUsuario.save();
            req.flash("success_msg", "Usuario Criado Com Sucesso!");
            res.redirect('/');
         }
      } catch (err) {
         req.flash("erro_msg", "Houve um erro interno");
         res.redirect('/');
      }
   }
});

router.get('/login', (req, res) => {
   res.render("usuarios/login")
})

// Autenticação
router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/usuarios/login',
   failureFlash: true
}))

// Logout
router.get('/logout', async (req, res, next) => {
   req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('success_msg', 'Deslogado com sucesso.');
      res.redirect('/');
   });
});


module.exports = router