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

    // Vamos colocar ?? nos dados cru
    const sql = `INSERT INTO Books (??, ??) VALUE (?, ?) `
    // e um array logo abaixo na ordem e passamos ele logo apos o sql
    const data = ['title', 'pageqty', title, pageqty]
    pool.query(sql, data, function (err) {

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
    const sql = `SELECT * FROM Books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, function (err, data) {
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
    const sql = `SELECT * FROM Books WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, function (err, data) {
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

    const sql = `UPDATE Books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pageqty', pageqty, 'id', id]
    pool.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})



app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM Books WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, (err) => {
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