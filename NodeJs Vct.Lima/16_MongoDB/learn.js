const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/learnMongoDB')
   .then(() => {
      console.log('MongoDB Conectado...');
   })
   .catch((err) => {
      console.error('Houve um erro:', err);
   });

// Definindo o Schema
const UsuarioSchema = new mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   sobrenome: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   idade: {
      type: Number,
      required: true
   },
   pais: {
      type: String
   }
});

// Criando o Modelo
const Usuario = mongoose.model('Usuario', UsuarioSchema, 'usuarios');

// Adicionando Dados
new Usuario({
   nome: "Jhonn",
   sobrenome: "Santt4na",
   email: 'jhonn@text.com',
   idade: 24,
   pais: 'Brasil'
}).save()
   .then(() => {
      console.log('Usuario adicionado com sucesso!')
   })
   .catch((err) => {
      console.log('Erro ao Adicionar Usuario', err)
   });