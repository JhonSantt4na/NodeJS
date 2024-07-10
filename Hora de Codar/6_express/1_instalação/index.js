const express = require("express");
const port = 3000
const app = express()

app.get('/', (req, res)=>{
    res.send("Olá Mundo!")
})

app.listen(port, ()=>{
    console.log(`Servidor Rodando na Porta: ${port}`)
})

// Comando para iniciar 
// npm init -y
// Comando para instalar 
// npm install express