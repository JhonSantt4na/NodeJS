const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')

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

console.log('Conectou ao Banco')
app.listen(3001);