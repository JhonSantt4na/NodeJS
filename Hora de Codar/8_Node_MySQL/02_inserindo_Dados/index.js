const express = require('express')
const exhbs = require("express-handlebars");
const mysql = require('mysql');

const app = express();
require('dotenv').config();
app.use(
    express.urlencoded({
        extends: true,
    })
)

app.use(express.json())

app.engine('handlebars', exhbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, ress) => {
    ress.render('home')
})

// Criando a conexão
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBS
})
// Estabelecendo a conecxão

app.post



conn.connect(function (err) {
    if (err) {
        console.log(err)
    }
    console.log('Conectou Ao Banco')
    app.listen(3030);
})

