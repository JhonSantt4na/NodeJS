const express = require('express');
const exphbs = require('express-handlebars')
require('dotenv').config();

const app = express();
const conn = require('./db/conn');


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.json())
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extends: true
    })
)


const port = process.env.PORT;
app.listen(port);