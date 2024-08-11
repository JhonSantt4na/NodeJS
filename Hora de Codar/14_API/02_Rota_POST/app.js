const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// Rotas e End Points
app.get('/', (req, res) => {
    res.json({
        message: "Rota '/' Iniciada"
    })
})

// Rota POST
app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    console.log(name, price);
    res.json({
        message: `O produto ${name}, foi criado com sucesso !`
    })
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})