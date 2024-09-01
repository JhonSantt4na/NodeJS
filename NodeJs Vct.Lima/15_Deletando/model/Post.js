const db = require('../db/db')

const Post = db.sequelize.define('postagens', {
   titulo: {
      type: db.Sequelize.STRING
   },
   conteudo: {
      type: db.Sequelize.TEXT
   }
})

// Usamos o comando somente uma vez, pois se não sempre recriara a tabela
// Post.sync({ force: true })

module.exports = Post