const express = require('express');
const exphbs = require("express-handlebars");
const conn = require('./db/conn')
const app = express();

const productsRoutes = require('./routes/produtsRoutes')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')
app.set('views', 'views');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extends: true
}))

app.use('/products', productsRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando no http://localhost:3000/products')
})