const express = require('express');
const exphbs = require('express-handlebars')

const app = express()

// Confg do partial e invocação
const hbs = exphbs.create({
    partialsDir: 'views/partials',
})

// mudamos a nossa função e colocamos a nova invocação
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/dashbord', (req, res) => {

    const itens = ["item a", "Item b", "Item c"]

    res.render('dashbord', { itens })
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: "javascript",
        body: "Este artigo vai te ajudar a aprender node.js",
        coments: 4,
    }
    res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: "Aprendendo Node",
            category: "Js",
            body: "Javascript",
            coments: 8
        }, {
            title: "Aprendendo Python",
            category: "Py",
            body: "Python",
            coments: 10
        }, {
            title: "Aprendendo Typescript",
            category: "Ts",
            body: "typescript",
            coments: 9
        }
    ]
    res.render('blog', { posts })
})

app.get('/', (req, ress) => {
    const user = {
        name: "Jorge",
        surname: "Santt4na"
    }
    const palavra = "Amor"

    const auth = false
    const approved = false

    ress.render('home', { user: user, palavra, auth, approved })
})

app.listen(3001, () => {
    console.log('App Start')
})