const express = require('express');
const axios = require('axios');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extends: true }))
// Url: viacep.com.br/ws/01001000/json/
// viacep.com.br/ws/01001000/json/


app.post('/CEP', async (req, res) => {

    const cepUser = req.body.cep

    if (!cepUser ) {
        res.json({ msg: 'Informe um cep' })
    }

    if (cepUser.length > 9) {
        res.json({ msg: 'CEP Inválido' })
    }

    function createURL(cep) {
        return 'https://viacep.com.br/ws/' + cep + '/json/';
    }

    await axios.get(createURL(cepUser))
        .then(response => {
            const cidade = response.data.localidade
            const uf = response.data.uf

            res.json({ msg: `o CEP Corresponde:${cidade}-${uf}` });
        })
        .catch(error => {
            console.error('Erro na requisição GET:', error);
        });

})

app.listen('3000', () => {
    console.log('http://localhost:3000')
})