import chalk from 'chalk';

const nota = 1;
if (nota >= 7){
    console.log(chalk.green('Parabéns! Está Aprovado!'));
}else{
    console.log(chalk.bgRed.white('Você Foi reprovado!'));
}