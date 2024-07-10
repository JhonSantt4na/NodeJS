const express = require('express')
const porta = 3000 
const app = express() 

const path = require('path')
// Criando o diretorio dinamico 
// dirname = pasta atual 
// + nome do arquivo  
const basePath = path.join(__dirname, 'templates')

// estabelecendo o midd
const checkAuth =function(req, res, next){
    // true para testar manual pois isso vem do usuario se esta ou não logado
    req.authStatus = false
    if(req.authStatus){
        console.log("Está Logado pode continuar")
        // ok passou no teste então vamos para o proximo passo pois 
        // precisa de uma resposta , caso contrario carrega em loop
        next()
    }else{
        console.log("faça o login para continuar")
        next()
    }

}

app.use(checkAuth)

app.get("/", (req, res) => {
    // mandando como resposta o diretorio criado mais o arquivo index.html
    res.sendFile(`${basePath}/index.html`)
}) 

app.listen(porta, ()=>{
    console.log(`Servidor iniciado na Porta: ${porta}`)
})

