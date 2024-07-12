const express = require('express');
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, ress) => {
    ress.render('home')
})

app.listen(3001, () => {
    console.log('App Start')
})