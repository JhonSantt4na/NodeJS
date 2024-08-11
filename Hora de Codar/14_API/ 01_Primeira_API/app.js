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

app.listen(3001, () => {
    console.log('http://localhost:3001')
})