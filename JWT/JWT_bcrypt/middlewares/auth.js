const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports={
    eAdmin: async function (req,res,next){
        // recebo primeiro o estilo do token e depois o token
        const authHeader = req.headers.authorization;
    
        if(!authHeader) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro: Necessario Realizar o Login para acessar a página'
            })
        }
        // separando em dois e pegando o nosso token
        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro B: Necessario Realizar o Login para acessar a página'
            })
        }
       
        try {
            const decode = await promisify(jwt.verify)(token. process.env.SECRET);
            req.user = decode.id
            return next()
        } catch (erro) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro tok invalido: Necessario Realizar o Login para acessar a página'
            })           
        }

    }
}