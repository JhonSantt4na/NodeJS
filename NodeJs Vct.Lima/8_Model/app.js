const express = require('express');
const Sequelize = require('sequelize');
require('dotenv').config()

const host = process.env.DB_HOST
const pass = process.env.DB_PASS
const user = process.env.DB_USER
const dbs = process.env.DB_DBS

//concetar ao banco
const sequelize = new Sequelize(dbs, user, pass, {
   host: host,
   dialect: 'mysql'
})

// Models Criamos as Tabelas:
const Postagem = sequelize.define('postagens', {
   titulo: {
      type: Sequelize.STRING,
   },
   conteudo: {
      type: Sequelize.TEXT
   }
})
// Gerando o Model Model.sync(force=recriar sempre a tabela)
Postagem.sync()

const Usuario = sequelize.define("usuarios", {
   nome: {
      type: Sequelize.STRING
   },
   sobrenome: {
      type: Sequelize.STRING
   },
   idade: {
      type: Sequelize.INTEGER
   },
   email: {
      type: Sequelize.STRING
   }
})
Usuario.sync()

// Adicionando itens a tabelas
Postagem.create({
   titulo: 'Ola Mundo!',
   conteudo: "Usando sequelize com MySQL"
})

Usuario.create({
   nome: "João",
   sobrenome: "Mario",
   idade: 18,
   email: "JoãoMario@teste.com"
})

const app = express()

app.use(express.json())

app.listen(3000, () => {
   console.log('Server is Running in http://localhost:3000')
})