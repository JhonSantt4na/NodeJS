const express = require('express');
const publicRoutes = require ('./routes/public.js');
const privateRoutes = require ('./routes/private.js');
const auth = require('./middlewares/auth.js')
const app = express();
app.use(express.json())

app.use('/usuarios', publicRoutes)
app.use('/usuarios', auth, privateRoutes)

app.listen(3000, ()=>{
    console.log('Servidor no Ar')
})