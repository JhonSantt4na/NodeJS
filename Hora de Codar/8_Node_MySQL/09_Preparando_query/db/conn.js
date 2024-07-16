const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBS
})

module.exports = pool