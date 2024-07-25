const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SECRET = 'luiztools'


const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Ola mundo')
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    const index = blacklist.findIndex(item => item === token);
    if (index !== -1) return res.status(401).end();


    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        res.userId = decoded.userId;
        next();
    })
}

app.get('/clientes', verifyJWT, (req, res) => {
    console.log(req.userId + "Fez essa chamada!")
    res.json([{
        id: 1,
        nome: 'Luiz'
    }])
})

app.post('/login', (req, res) => {
    if (req.body.user === 'Luiz' && req.body.password === '123') {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token });
    }
    res.status(401).end("não foi");
})

const blacklist = [];

app.post('/logout', function (req, res) {
    blacklist.push(req.headers['x-access-token']);
    res.end()
})

const server = http.createServer(app);
app.listen(3000, () => {
    console.log('Servidor iniciado')
})

