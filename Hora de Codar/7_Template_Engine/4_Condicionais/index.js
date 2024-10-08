const express = require('express');
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashbord', (req, res) => {
    res.render('dashbord')
})



app.get('/', (req, ress) => {
    const user = {
        name: "Jorge",
        surname: "Santt4na"
    }
    const palavra = "Amor"

    // exemplo de autenticação
    const auth = true

    ress.render('home', { user: user, palavra, auth })
})

app.listen(3001, () => {
    console.log('App Start')
})