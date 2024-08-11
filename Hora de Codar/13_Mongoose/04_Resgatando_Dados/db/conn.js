const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongoose')
    console.log('Conectou ao mongoDB com o Mongoose')
}

// Caso tenha algum erro
main().catch((err) => { console.log(err) })

module.exports = mongoose