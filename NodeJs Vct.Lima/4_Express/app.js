const express = require('express');
// Importamos e adicionamos o express a variavel app
const app = express()

// req = requisição 
// res = resposta

// Rotas : Caminhos da aplicação
// rotas '/'
app.get('/', (req,res)=>{
    res.send('Usando Express')
})

// rota '/sobre'
app.get('/sobre', (req,res)=>{
    res.send('Sobre meu site')
})

// rota '/blog'
app.get('/blog', (req,res)=>{
    res.send('Sobre meu blog')
})

// funçao escultador
app.listen(3000, ()=>{
    console.log("Servidor Rodando: http://localhost:3000")
});

//localhost:porta
// apenas isso já é o suficiente ( o listen tem q ser sempre o ultimo)
// listen tem uma função callback ou seja de retorno do evento
// Funcção de callback é smpre execultada quando um evento acontece
// A maioria das funções do node tem uma callback