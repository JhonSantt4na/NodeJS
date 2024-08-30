const { DataTypes } = require('sequelize');
const db = require('../Database/db');

const Customer = db.define('Customer', {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   phone: {
      type: DataTypes.STRING,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   }
}, {
   timestamps: true,
   tableName: 'Customer'
});

module.exports = Customer;