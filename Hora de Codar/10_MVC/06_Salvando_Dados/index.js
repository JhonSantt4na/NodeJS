const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');
require('dotenv').config();

const app = express();

const conn = require('./db/conn');
const Task = require('./models/Task')
const tasksRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Indicando onde estão as views
app.set('views', 'Views');

app.use(
    express.urlencoded({
        extends: true
    })
)
app.use(express.json())
app.use(express.static('public'));

app.use('/tasks', tasksRoutes)

const port = process.env.PORT || 3000;
conn.sync()
    .then(() => {
        app.listen(port);
    }).catch((err) => {
        console.log(err);
    })