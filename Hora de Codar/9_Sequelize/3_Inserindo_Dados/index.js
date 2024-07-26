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
    // Newsletter como é check box ele retorna on/off ou seja nulo ou 1
    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }
    // Criando User com o ORM SEQUELIZE, Com o metodo create, aguardando ele ser criado
    await User.create({ name, occupation, newsletter })
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('home');
});


conn.sync().then(() => {
    app.listen(3001);
})
    .catch((err) => console.log(err))
