const express = require('express');
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, ress) => {
    const user = {
        name: "Jorge",
        surname: "Santt4na"
    }
    const palavra = "Amor"

    // Podemos colocar somente um user
    // No segundo argumento passamos chave e valor
    // Tudo que passar aqui vou poder usar na view home
    ress.render('home', { user: user, palavra })
})

app.listen(3001, () => {
    console.log('App Start')
})