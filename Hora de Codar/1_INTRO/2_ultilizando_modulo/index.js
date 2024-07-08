const fs = require ("fs") // File system 
//Normalmente colocamos modulos em variaveis contante que não muda
// e sempre colocamos o nome da variavel com o nome do modulo

// os modulos tem metodos, basicamente são como classes
fs.readFile("arquivo.txt", "utf-8", (err,data)=>{
// fs.metodo("local_do_arquivo", "estilo_letras" (erro, resultado))
// se estiver com erro, ele escreve erro no console
if (err) {
        console.log("Erro")
    }
// Caso não tenha um erro ele nos retorna os dados do arquivo txt
    console.log(data);
})
