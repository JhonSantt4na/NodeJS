const fs = require('fs');

const arqAntigo = "arquivo.txt"
const arqNovo = "arquivonovo.txt"

fs.rename(arqAntigo, arqNovo, function (err){
    if(err){
        console.log(err)
        return
    }

    console.log(`o Arquivo ${arqAntigo}, foi Renomeado para ${arqNovo}`)

})