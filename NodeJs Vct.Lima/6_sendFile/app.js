const express = require('express');
const app = express()

app.get('/', (req,res)=>{
    // Enviando Strings como mensagens
    res.send('Usando Express')
})

app.get('/site', (req,res)=>{
    // Enviando arquivos
    // __dirname : diretorio raiz + local do index.html
    res.sendFile(__dirname + '/html/index.html');
})

app.get('/sobre', (req,res)=>{
    // Enviando arquivos
    // __dirname : diretorio raiz + local do sobre.html
    res.sendFile(__dirname + '/html/sobre.html');
})

app.listen(3000, ()=>{
    console.log("Servidor Rodando: http://localhost:3000")
});
