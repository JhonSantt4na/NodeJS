const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql2');
require('dotenv').config()
const port = process.env.PORT || 3000;
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
const conn = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBS
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }
    console.log('Conectou Ao Banco')

    app.listen(port, () => {
        console.log(`Servidor Rodando`);
    })
})

