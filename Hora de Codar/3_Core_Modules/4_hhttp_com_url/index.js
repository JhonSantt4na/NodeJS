const http = require('http');


const port = 3000

const server = http.createServer((req, res)=>{
    
    // vamos pegar da url o metodo parse e pegaremos url da requisiçao, true para informar que esta 
    const urlInfo = require('url').parse(req.url, true)
    // pegando o nome do parametro da url
    // pegando da url composta somente o name
    const nome = urlInfo.query.name

    res.statusCode = 200
    res.setHeader('Contenty-Tpe', 'text/html')
    if(!nome) {
        res.end('<h1>Prencha o seu nome:</h1><form method="GET"><input type="text" name="name"/><input type="submit" value="Enviar"/></form>')
    }else{
        res.end(`<h1> Seja bem-vindo ${nome}</h1>`)
    }

})

server.listen(port, () => {
    console.log("Servidor Rodando na Porta 3000")
})