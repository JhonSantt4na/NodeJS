const path = require('path')

//path absoluto
console.log(path.resolve("teste.txt"))

// Formar Path
const midFolder = "Relatorios"
const filename = "Jorge.txt"

const finalPath = path.join("/", 'arquivos', midFolder, filename)
console.log(finalPath);