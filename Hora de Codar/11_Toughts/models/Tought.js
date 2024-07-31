const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Tought.belongsTo(User) // 1 Pensamento pertence a 1 Usuario
User.hasMany(Tought)   // Mais 1 Usuario tem varios pensamentos

module.exports = Tought;