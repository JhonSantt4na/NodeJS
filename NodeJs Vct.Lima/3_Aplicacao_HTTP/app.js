const http = require('http');
// Importamos o mudulo http do core do node
// basta adicionar o nome da biblioteca 

// todo o modulo esta dentro da variavel http 
// vamos usar a  funãi creatserver() que é do modulo para criarmos uma servidor 
http.createServer((req, res) =>{
    // req = requisição 
    // res = resposta
    res.end('Ola, mundo'); // Adicionando uma string como resposta 
}).listen(3000);

console.log('Servidor Rodando!')

// se o nosso servidor não tiver a sua função de callback com a resposta o nosso serve fica aguardando uma resosta que não tem em loop
// sempre que mudarmos o codigo temos que reiniciar o servidor 
// ctrl + c para o servidor