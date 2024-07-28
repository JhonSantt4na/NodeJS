const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User')

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    }
})


// Hasmany quer dizer que user tem mais de 1 endereço
User.hasMany(Address);
// Belongs pertence ou seja o endereço pertence a um usuario
Address.belongsTo(User);

module.exports = Address