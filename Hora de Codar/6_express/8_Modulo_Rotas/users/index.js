const express = require('express');
const router = express.Router();
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res)=>{
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    console.log(`O Nome do usuario é ${name} e ele tem ${age} anos`)
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    // podemos pegar algo no Database
    console.log(`Estamos buscando pelo usuario : ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

module.exports = router