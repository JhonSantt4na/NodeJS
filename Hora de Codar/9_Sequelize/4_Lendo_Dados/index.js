const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')

const User = require('./models/User')

const app = express();
require('dotenv').config();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({
    extends: true
}));

app.use(express.json());

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.ocupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({ name, occupation, newsletter })
    res.redirect('/')
})

app.get('/', async (req, res) => {
    // Usando o metodo findAll com o atributo raw = true
    const users = await User.findAll({ raw: true })
    // Sem o atributo raw vem monte de coisa desnecessarias
    res.render('home', { users });
});

conn.sync().then(() => {
    app.listen(3001);
})
    .catch((err) => console.log(err))
