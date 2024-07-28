// Para entender o tipo de dados do DBS
const { DataTypes } = require('sequelize');

// Importando a conecão
const db = require('../db/conn')

// Criando Tabela
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = User