import express from 'express'
const app = express();
const port = 3000;

const users = []
// informando ao express que vamos usar o json
app.use(express.json());



app.post('/usuarios', (req, res) => {
    // adicionando o que vem no body da req no array users
    users.push(req.body)
    // responde, statuscode em json retorna o sacana criado
    res.status(201).json(req.body)
})

app.get('/usuarios', (req, res) => {
    // respondenso, statuscode em json o nosso array json
    res.status(200).json(users)
})

app.listen(port, () => {
    console.log('Servidor Iniciado')
})