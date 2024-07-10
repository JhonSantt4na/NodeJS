// Modulos externos
import inquirer from 'inquirer'
import chalk, { Chalk } from 'chalk'

// Modulos Core Modules 
import fs from 'fs'
import { type } from 'os';

// Chamando a função (Tem q ser auto inicializada)
operatio();

console.log("Iniciamos o Accounts");
//Operações 
function operatio(){
    //prompt = pergunta para o usuario
    // obs quando usamos o metodo prompt agente vai colocar um obj no array 
    // o bjt contem typo, name, message, choices ou seja tipo, nome, placeholder, opções
    // e a nossa resposta no .then((resposta)função) essa resposta tem um array com o objeto para pegar qualquer valor basta instaniar a propriedade do obj
    inquirer.prompt([{
        // tipo de lista
        type : 'list',
        // nome = ação
        name : 'action',
        // msg que vai aparecer
        message : 'O que você deseja fazer?',
        // Opçoes do usuario
        choices : [
            "Criar Conta",
            "Consultar Saldo",
            'Depositar',
            'Sacar',
            'Sair'
        ]},
    ])
    .then((answer) => {
        const action = answer['action']
        if(action === "Criar Conta"){
            creatAccount()
        } else if ( action === "Consultar Saldo"){
            getAccountBalance();
        } else if ( action === "Depositar"){
            deposit()
        } else if ( action === "Sacar"){
            withdraw()
        } else if ( action === "Sair"){
            console.log(chalk.bgBlue.black('Obrigado por usar Accounts!'))
            // Encerrar o sistema
            process.exit 
        }
    })
    .catch((err) => console.log(err))
}

// coletando info
function creatAccount(){
    // perguntas para criar a conta 
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso Banco!"))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}
// Criando conta 
function buildAccount(){
    inquirer.prompt([
        {
            name:"accountName",
            message: "Digite o nome da conta: ",
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)
        // criando pasta diretorio se não tiver ele cria
        if (!fs.existsSync('accounts')){
            // se não tiver essa pasta acoounts, cria ela 
            fs.mkdirSync('accounts');
        }
        // validando se o nome da conta ja existe
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black("Essa conta já existe, Escolha outro nome!"))
            buildAccount()
            // return para  ficar no loop esperando um nome valido 
            return
        }
        // Criando arquivo das contas
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance":0}',
            function (err) {
                console.log(err)        
            }
        )

        console.log(chalk.green("Parabéns, a sua conta foi criada!"))
        operatio();
    })
    .catch((err)=> console.log(err))
}
// Pegando saldo
function getAccountBalance(){
    inquirer.prompt([
        {
        name:'accountName',
        message: 'Qual o nome da sua conta ?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }
        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$ ${accountData.balance}`,))
        operatio();
    }).catch(err => console.log(err))
}
// Depositando
function deposit(){
    inquirer.prompt([
    {
        name:"accountName",
        message: "Qual o nome da sua conta: ",
    },
    ])
    .then((answer)=>{ 
        const accountName = answer["accountName"]
        // verificando existencia 
        // se não existe 
        if(!checkAccount(accountName)) {
            return deposit()
        }
        inquirer.prompt([
            {
            name: 'amount',
            message: 'Quanto você deseja depositar',
            }
        ]).then((answer)=>{
            const amount = answer["amount"]
            // adicionar deposito
            addAmount(accountName, amount)
            operatio();
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}
// Sacando 
function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta ?'
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return withdraw()
        }
        inquirer.prompt([
            {
                name:'amount',
                message: 'Quanto você deseja sacar ?'
            }
        ]).then((answer)=>{
            const amount = answer['amount'];
            removeAmount(accountName, amount)
        }).catch(err => console.log(err))


    }).catch(err => console.log(err))
}
// Checando se a conta existe
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Essa conta não Existe, Tente novamente!"))
        return false
    }
    // se existe retornamos true
    return true
}
// Adicionando valor
function addAmount(accountName, amount){
    const accountData = getAccount(accountName)
    // verificando espaços vazio
    if(!amount){
        console.log(chalk.bgRed.black('Ocoreu um Erro, Tente novamente mais tarde'))
        return deposit()
    }
    // fazendo o deposito, pegamos o balance do account e convertemos o amout para numero e somamos com o que tinha
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    // salvando o arquivo + convertendo para json e função caso tenha erro
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),function (err) {console.log(err)})
    console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta`))
}
// Removendo Valor
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"))
        return withdraw()
    }
    
    // verificando se o valor é menor 
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('valor indisponivel!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err)
    })
    console.log(chalk.green(`Foi realizado o saque de R$ ${amount} da sua conta`))
    operatio();
}       
// pegando conta existente
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON);
}