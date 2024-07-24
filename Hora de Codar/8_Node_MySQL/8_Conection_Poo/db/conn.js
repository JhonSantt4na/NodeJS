const mysql = require('mysql')
const Connection = require('mysql/lib/Connection')
require('dotenv').config();


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBS
})

module.exports = pool
