const express = require('express');
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashbord', (req, res) => {
    // Trabalhando com o loops

    const itens = ["item a", "Item b", "Item c"]

    res.render('dashbord', { itens })
})

app.get('/', (req, ress) => {
    const user = {
        name: "Jorge",
        surname: "Santt4na"
    }
    const palavra = "Amor"

    // exemplo de autenticação para usar o else
    const auth = false
    const approved = false

    ress.render('home', { user: user, palavra, auth, approved })
})

app.listen(3001, () => {
    console.log('App Start')
})