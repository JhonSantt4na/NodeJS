const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { route } = require('./public');
const { PassThrough } = require('stream');


const prisma = new PrismaClient();
const router = express.Router()


router.get('/listar-usuarios', async (req, res) =>{

    try{
        // pegando todos os ususarios 
        // com o omit não pegamos a senha
        const users = await prisma.user.findMany()
        res.status(201).json({message: "Usuarios Listados", users})
    }catch (err){
        res.status(500).json({
            message: "Erro No Servidor, Tente Novamente"
        })
    }
})


module.exports = router;