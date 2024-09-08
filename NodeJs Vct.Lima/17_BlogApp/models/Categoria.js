const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
   nome: {
      type: String,
      required: true
   },
   slug: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

mongoose.model('categorias', CategoriaSchema);
module.exports = mongoose.model('categorias');
