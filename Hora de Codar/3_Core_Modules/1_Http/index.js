const http = require('http');

const port = 3000

const server = http.createServer((req, res)=>{
    res.write("Oi Http")
    res.end()
})

server.listen(port, () => {
    console.log("Servidor Rodando na Porta 3000")
})