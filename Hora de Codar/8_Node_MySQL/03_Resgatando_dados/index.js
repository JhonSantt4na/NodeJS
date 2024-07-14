// Imports 
const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql2');

// Configs do ENV
require('dotenv').config()

// Instanciando o Express
const app = express()

// Configurando o Handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Permitindo o Express usar arquivos estaticos da pasta public
app.use(express.static('public'))
// permitindo o Express pegar o body das req
app.use(
    express.urlencoded({
        extended: true,
    })
)
// Informado que vamos trabalhar com JSON 
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




// Rota Home
app.get('/', (req, res) => {
    res.render('home')
})

// Estabelecendo a Conexão com o DB
const conn = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBS
})

// Tratando o erro da Conexão do DB
conn.connect(function (err) {
    if (err) {
        console.log(err)
    }
    // Se conectar, log informando e configuramos a porta que o serve esta ouvindo
    console.log('Conectou Ao Banco')

    app.listen(process.env.PORT, () => {
        console.log(`Servidor Rodando`);
    })
})