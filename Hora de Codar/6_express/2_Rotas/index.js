const express = require('express')
const porta = 3000 // variavel ambiente
const app = express() // invocando o express na variavel app
// app metodo(rota, requisição, resposta)
app.get("/", (req, res) => {
    // resposta.enviada(msg)
    res.send('Olá mundo !')
})
//app ouvindo a porta, função de callback
app.listen(porta, ()=>{
    console.log(`Servidor iniciado na Porta: ${porta}`)
})

