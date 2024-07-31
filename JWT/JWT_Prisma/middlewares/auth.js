const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

const auth = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ');
    // console.log(token[1])
    if(!token){
        return res.status(401).json({message: "Acesso Negado !"})
    }

    try{
        // metodo verify espera o token e o secret
        const decoded = jwt.verify(token[1], JWT_SECRET)
       
    }
    catch(err){
        return res.status(401).json({message: "Token Invalido"})
    }
    next() 
}

module.exports = auth;