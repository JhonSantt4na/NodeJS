const minimist = require("minimist");

const args = minimist(process.argv.slice(2))
console.log(args);
// com notação de array 
const nome = args['nome']
const profissao = args['profissao']
console.log(nome, profissao);

console.log(`O nome dele é ${nome} e a Profissão dele é ${profissao}`);
