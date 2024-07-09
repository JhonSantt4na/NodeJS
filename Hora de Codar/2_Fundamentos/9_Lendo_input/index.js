const readline = require("readline").createInterface({
    // Do node para pegar o input e output
    input: process.stdin,
    output: process.stdout, 
})

readline.question("Qual a sua linguagem preferida?", (language) => {
    if(language === "Python"){
        console.log("Isso nem é Linguagem !")
    } else {
        console.log(`A minha linguagem preferida é ${language}`)
    }
    readline.close()
});

