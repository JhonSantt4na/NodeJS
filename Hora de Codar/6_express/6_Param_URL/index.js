const express = require('express')
const porta = 3000 
const app = express() 

const path = require('path')
// Criando o diretorio dinamico 
// dirname = pasta atual 
// + nome do arquivo  
const basePath = path.join(__dirname, 'templates')

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    // podemos pegar algo no Database
    console.log(`Estamos buscando pelo usuario : ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

app.get("/", (req, res) => {
    // mandando como resposta o diretorio criado mais o arquivo index.html
    res.sendFile(`${basePath}/index.html`)
}) 

app.listen(porta, ()=>{
    console.log(`Servidor iniciado na Porta: ${porta}`)
})

