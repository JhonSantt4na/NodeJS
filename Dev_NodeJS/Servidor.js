const http = require('http');

const server = http.createServer((req, res) => {
   var categoria = req.url;
   if (!categoria) {
      res.end(`<h1>Bem-Vindo a HOME<h1>`)
   }
   res.end(`<h1>${categoria}<h1>`)


}).listen(3000, () => {
   console.log('http://localhost:3000')
})
