// Nome 

console.log(process.argv);
// Ele retorna o arquivo do node
// Qual arquivo está execultando 
// E o argumento

// sendo o argumento estando no 3 indice

const args = process.argv.slice(2);
// consy = process no indice 02 que no caso é o argumento
console.log(args);

// pegando o nome 
const nome = args[0].split("=")[1];
// Pegando o argumento e dividindo com o espaco e peagando a segunda indice 1 que é somente o nome
console.log(nome);

const idade = args[1].split("=")[1];

console.log(`O nome é ${nome} a Idade é ${idade}`)