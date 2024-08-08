// importando as funções da calculadora
// sempre usamos o require para importar ou o import no ecs6
// não precisa colocar a extenção
const somar = require('./somar');
const subtrair = require('./subtrair');
const multiplicar = require('./multiplicar');
const divisao = require('./divisao');
// apartir disso as nossa variaveis são a representação das funções


console.log(somar(10,2));
console.log(subtrair(10,2));
console.log(multiplicar(10,2));
console.log(divisao(10,2));

// Muito usado para: refatorar, dividir responsabilidades, organizar o projeto, importar bibliotecas,