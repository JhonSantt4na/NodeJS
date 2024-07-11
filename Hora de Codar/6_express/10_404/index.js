const express = require('express')
const porta = 3000 
const path = require('path')
const users = require('./users')
const app = express() 

// Ler o body
app.use(
    express.urlencoded({
        extends: true
    }),
)

app.use(express.json())

// Arquivos estaticos
app.use(express.static('public'))




const basePath = path.join(__dirname, 'templates')

app.use('/users', users)

app.get("/", (req, res) => {
    // mandando como resposta o diretorio criado mais o arquivo index.html
    res.sendFile(`${basePath}/index.html`)
}) 

app.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})


app.listen(porta, ()=>{
    console.log(`Servidor iniciado na Porta: ${porta}`)
})

