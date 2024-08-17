const { Schema } = require('mongoose');
const mongoose = require('../db/conn');


const Pet = mongoose.model(
    'Pet',
    new Schema(
        {
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            images: {
                type: Array,
                required: true
            },
            available: {
                type: Boolean
            },
            user: Object,
            adopter: Object,
        },
        { timestamps: true }, // Basicamente cria duas colunas novas com createDate e UpdateDate para salvar quando for criado e atualizado
    ),
)

module.exports = Pet