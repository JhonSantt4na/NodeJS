const fs = require('fs')

console.log("inicio");

// Aqui o node não espera a função ser finalizado
fs.writeFile("arquivo.txt", 'oi', function(err){
    setTimeout(function(){
        console.log("Arquivo criado!")
    },1000)
})

console.log("Fim");