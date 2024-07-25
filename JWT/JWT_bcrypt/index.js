const { json } = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')


const { eAdmin } = require('./middlewares/auth')
dotenv.config()

const app = express();

app.use(express.json());

app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mesagem: "Listar Usuario"
    })
})

app.post('/cadastrar', async (req, res) => {
    // Fazendo um mock da senha
    // Criando uma senha criptografada
    const password = await bcrypt.hash('123456', 8);
    console.log(password);

    return res.json({
        erro: false,
        mensagem: "Cadastrar Usuario"
    })

})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.email != "jhonn@jhon.com") {
        return res.status(400).json({
            erro: true,
            messagem: "Erro: Usuario ou Senha Incorreto"
        })
    }

    if (!(await bcrypt.compare(req.body.password, "$2b$08$.3l7Sl0DdCpwUo6YYisM1uzThLd8vJdgK9oLgQrXexmFdPD2fqfn2"))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario ou Senha Incorreto"
        });
    }
    const secret = process.env.SECRET
    var token = jwt.sign({ id: 1 }, secret, {
        //expiresIn : 600 //10min
        expiresIn: '7d' //7dias
        //expiresIn : 60 // 1min
    })

    return res.json({
        erro: false,
        mesagem: "Login",
        //token : token
        // Como são iguais podemos resumir 
        token
    })
})

app.listen(3000, () => {
    console.log("Servidor Rodando na Porta 3000")
})
