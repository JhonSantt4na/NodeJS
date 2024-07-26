const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')

const User = require('./models/User');
const { where } = require('sequelize');

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

app.get('/users/:id', async (req, res) => {
    // Pegando o id dos parametros
    const id = req.params.id
    // Usando o metodo Findone para pegar o primeiro encontrado 
    // com o parametro where que passo a informações que quero que o primeiro que tenha eu consiga pegar, como passei o id esta especifico que é apenas um
    const user = await User.findOne({ raw: true, where: { id: id } })
    res.render('userview', { user })
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id: id } })
    res.redirect('/')
})

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true })
    res.render('home', { users });
});

conn.sync().then(() => {
    app.listen(3001);
})
    .catch((err) => console.log(err))
