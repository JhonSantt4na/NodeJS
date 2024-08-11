const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// Rotas e End Points
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Rota '/' Iniciada"
    })
})

// Rota POST
app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    console.log(name, price);

    if (!name) {
        res.status(422).json({
            message: 'O campo nome é obrigatorio!'
        })
        return
    }


    res.status(201).json({
        message: `O produto ${name}, foi criado com sucesso !`
    })
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})