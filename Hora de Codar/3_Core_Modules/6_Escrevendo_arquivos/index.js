const http = require('http');
const fs = require('fs');


const port = 3000

const server = http.createServer((req, res)=>{
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name
    
    if(!name){
        fs.readFile('index.html', function(err,data){
            // Mesmo comando abaixo porem com uma unica linhar, escrever a reposta, status code e tipo de arquivo
            res.writeHead(200, {'Content-Type':'text/html'})
            res.write(data)
            return res.end()
        })
    }else{
        fs.writeFile("arquivo.txt", name, function (err,data){
            res.writeHead(302, {
                Location: '/',
            })
            return res.end();
        })
    }




 
})

server.listen(port, () => {
    console.log("Servidor Rodando na Porta 3000")
})