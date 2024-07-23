const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

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

    const sql = `INSERT INTO books (title,pageqty) VALUES ('${title}', '${pageqty}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/books')
    })
});

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        const books = data;
        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, function (err, data) {
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

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function (err, data) {
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

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err);
            return
        }

        res.redirect('/books')
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

conn.connect(function (err) {

    if (err) {
        console.log(err);
    }

    console.log('Conectou ao Banco')
    app.listen(3001);
})