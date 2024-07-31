const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const router = express.Router()

// SECRET
const JWT_SECRET = process.env.SECRET

router.post('/cadastro', async(req, res)=>{
    const user = req.body
    // usando o bcrypt com o genSalt(10) padrão seria a força da senha
    const salt = await bcrypt.genSalt(10)
    // Criando o hash da senha = misturar a senha original com o salt
    // usamos o bcypt.hash(senha, salt) que é um metodo do bcrypt
    const hashPassword = await bcrypt.hash(user.password, salt)

    try{
        // Metodo do ORM Primas CREATE Para mandar para o banco de dados
        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })
        res.status(201).json(userDB)
    }
    catch (err){
        res.status(500).json({
            message: "Erro No Servidor, Tente Novamente"
        })
    }
})

// LOGIN

router.post('/login', async(req, res)=>{
    
    try{
        const userInfo = req.body
        
        // verificando se o user existe
        // Usando o Metodo do prisma findUnique para pegar o usuario do email unico
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email},
        })

        // se não tiver o usuario
        if(!user){
            return res.status(404).json({message: "Usuario Não Encontrado"})
        }

        // Comparando as senhas com o bcrypt com o metodo compare 
        // Passando a senha com o hash e a senha do banco
        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        // se não existe
        if (!isMatch){
            return res.status(404).json({message: "Senha invalida"})
        }

        // gerando o token
        
        // com o metodo sing criamos o token
        // passando como parametro os dados que queremos deixar salvo la pra não acessar o token
        // o secret e p expiresIn: que é o tempo logado
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7m'})

        res.status(200).json(token)

    } catch (err){
        res.status(500).json({
            message: "Erro No Servidor, Tente Novamente"
        })
    }
})

module.exports = router;
