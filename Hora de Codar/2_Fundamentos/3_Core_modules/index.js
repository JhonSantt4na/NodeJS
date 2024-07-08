//importamos o path
const path = require("path");

// pegamos o metodo estname de dentro do path e passamos o arquivo 
const extension = path.extname("arquivo.php")
// nome da variavel = extrair do path(arquivo)
console.log(extension)
// Ele nos retorna a extensão do arquivo
