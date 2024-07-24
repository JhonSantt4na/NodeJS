const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn')

const app = express();
require('dotenv').config();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({
    extends: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pageqty = req.body.pageqty;
    // Colunas colocamos ?? duas interogações
    // Valores colocamos ? apenas uma
    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    // Passamos os dados logo apos a query
    // Protegendo de sql inject
    pool.query(sql, data, function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/books')
    })
});

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        const books = data;
        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ? `
    const data = ['id', id]
    pool.query(sql, data, function (err, data) {
        if (err) {
            console.log(err);
        }
        // Data0 Pois o WHERE nos Retorn um Array  
        const book = data[0];
        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, function (err, data) {
        if (err) {
            console.log(err);
        }
        // Data0 Pois o WHERE nos Retorn um Array  
        const book = data[0];
        res.render('editbook', { book })
    })

})

app.post('/books/updatebook', (req, res) => {

    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pageqty', pageqty, 'id', id]
    pool.query(sql, data, function (err) {
        if (err) {
            console.log(err);
            return
        }

        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, function (err) {
        if (err) {
            console.log(err);
            return
        }
        res.redirect('/books')
    })
})


console.log('Conectou ao Banco')
app.listen(3001);