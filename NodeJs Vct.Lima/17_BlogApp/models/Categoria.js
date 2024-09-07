const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
   nome: {
      type: String,
      required: true,
   },
   slug: {  // Corrigido de 'sluge' para 'slug'
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now()
   }
})

const Categoria = mongoose.model('categoria', CategoriaSchema)

// Exporta o modelo
module.exports = Categoria