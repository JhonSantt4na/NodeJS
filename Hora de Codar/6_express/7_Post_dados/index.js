const express = require('express')
const porta = 3000 
const app = express() 

const path = require('path')
// Criando o diretorio dinamico 
// dirname = pasta atual 
// + nome do arquivo  
const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})
// Ler o body
app.use(
    express.urlencoded({
        extends: true
    }),
)

app.use(express.json())



app.post('/users/save', (req, res)=>{
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    console.log(`O Nome do usuario é ${name} e ele tem ${age} anos`)
})




app.get("/users/:id", (req, res) => {
    const id = req.params.id
    // podemos pegar algo no Database
    console.log(`Estamos buscando pelo usuario : ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

// Todas as rotas encima desse

app.get("/", (req, res) => {
    // mandando como resposta o diretorio criado mais o arquivo index.html
    res.sendFile(`${basePath}/index.html`)
}) 

app.listen(porta, ()=>{
    console.log(`Servidor iniciado na Porta: ${porta}`)
})

