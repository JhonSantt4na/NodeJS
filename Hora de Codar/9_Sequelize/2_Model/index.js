const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')

// Importando o model - "tabela do banco"
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

app.get('/', (req, res) => {
    res.render('home');
});


// Com isso ao Criamos a tabela ao iniciar o servidor 
// ou seja so inicia se criar a tabela corretamente
conn.sync().then(() => {
    app.listen(3001);
})
    .catch((err) => console.log(err))
