const express = require('express');
const exphbs = require("express-handlebars");

const conn = require('./db/conn')

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({
    extends: true
}))

app.listen(3000, () => {
    console.log('Servidor rodando no http://localhost:3000')
})