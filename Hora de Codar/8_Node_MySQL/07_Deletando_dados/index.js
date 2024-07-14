const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql2');

require('dotenv').config()

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

// CREATE = INSERT : Inserindo dados no Banco de Dados
app.post('/books/insertbook', (req, res) => {
    // pegando os dados do body da req
    const title = req.body.title
    const pageqty = req.body.pageqty

    // Query
    const sql = `INSERT INTO Books (title, pageqty) VALUE ("${title}", "${pageqty}") `

    // Executando a querry
    conn.query(sql, function (err) {
        // Na callback se tiver algum erro 
        if (err) {
            console.log(err)
        }
        // se não vamos redirecionar pra home
        res.redirect('/books')
    });
})

// Rota GET = SELECT Pegando todos os dados do DB
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM Books"
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const books = data;
        res.render('books', { books });

    })
})

// Buscas Individuais
app.get('/books/:id', (req, res) => {
    // Resgatando o parametro na req id
    const id = req.params.id
    const sql = `SELECT * FROM Books WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        // Indice 0 pois ele vai trazer varios e vamos pegar somente o primeiro
        const book = data[0]
        res.render('book', { book })

    })
})

// Editando dados
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM Books WHERE id = ${id}`
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0];
        res.render('editbook', { book })
    })
})

// UPDATE
app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE Books SET title = "${title}", pageqty = "${pageqty}" WHERE id = "${id}"`
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

// DELETE = Deletando dados

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM Books WHERE id = ${id}`
    conn.query(sql, (err) => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})




// Rota Home
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

    app.listen(process.env.PORT, () => {
        console.log(`Servidor Rodando`);
    })
})