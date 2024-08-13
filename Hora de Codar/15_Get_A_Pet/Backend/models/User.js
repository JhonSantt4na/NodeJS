const { Schema } = require('mongoose');
const mongoose = require('../db/conn');
const { schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
    }, { timestamps: true }, // Basicamente cria duas colunas novas com createDate e UpdateDate para salvar quando for criado e atualizado
    ),
)

module.exports = User