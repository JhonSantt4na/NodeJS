const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');

// Importar os Schema
const Usuarios = require('../models/Usuario')

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
      // Proxima
   }

})

module.exports = router