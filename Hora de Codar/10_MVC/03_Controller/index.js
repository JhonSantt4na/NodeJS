const express = require('express');
const exphbs = require('express-handlebars')
require('dotenv').config();

const conn = require('./db/conn');
const Task = require('./models/Task')

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.json())
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extends: true
    })
)

// Sicronizando a inicialização do server com a criação do model ou tabela
const port = process.env.PORT;

conn.sync()
    .then(() => {
        app.listen(port);
    }).catch((err) => {
        console.log(err);
    })