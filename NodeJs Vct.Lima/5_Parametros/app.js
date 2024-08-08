const express = require('express');
const app = express()



// rotas '/', '/sobre', '/blog' e '/Ola'
app.get('/', (req,res)=>{
    res.send('Usando Express')
})

app.get('/sobre', (req,res)=>{
    res.send('Sobre meu site')
})

app.get('/blog', (req,res)=>{
    res.send('Sobre meu blog')
})

// Criando uma rota parametrizada
// quando colocamos /: quer dizer que é um parametro

app.get('/ola/:nome/:cargo',(req, res)=>{ // localhost:3000/ola/(o que eu colocar aqui serve como valor para nome parametro )
    const nome = req.params.nome;
    const cargo = req.params.cargo;
    res.send(`Ola ${nome}, bem vindo ${cargo}`)
})

app.listen(3000, ()=>{
    console.log("Servidor Rodando: http://localhost:3000")
});
