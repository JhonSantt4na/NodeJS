const express = require('express');
const exphbs = require('express-handlebars')
const pool = require('./db/conn');

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

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO Books (title, pageqty) VALUE ("${title}", "${pageqty}") `

    pool.query(sql, function (err) {

        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    });
})


app.get('/books', (req, res) => {
    const sql = "SELECT * FROM Books"
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const books = data;
        res.render('books', { books });

    })
})


app.get('/books/:id', (req, res) => {

    const id = req.params.id
    const sql = `SELECT * FROM Books WHERE id = ${id}`

    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0]
        res.render('book', { book })

    })
})


app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM Books WHERE id = ${id}`
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0];
        res.render('editbook', { book })
    })
})


app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE Books SET title = "${title}", pageqty = "${pageqty}" WHERE id = "${id}"`
    poll.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})



app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM Books WHERE id = ${id}`
    pool.query(sql, (err) => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})


app.get('/', (req, res) => {
    res.render('home')
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor Rodando`);
})