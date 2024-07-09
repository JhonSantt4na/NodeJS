const http = require('http');

const port = 3000

const server = http.createServer((req, res)=>{
   res.statusCode = 200
   res.setHeader('Contenty-Tpe', 'text/html')
   res.end("<h1> Olá Mundo ! </h1><p>Oi</p>")
})

server.listen(port, () => {
    console.log("Servidor Rodando na Porta 3000")
})