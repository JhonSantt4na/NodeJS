const express = require('express');
const routers = require('./router');
const conn = require('./Database/db')

require('dotenv').config()
const PORT = process.env.PORT

const app = express();
app.use(express.json());

app.use('/user', routers)

conn.sync({ force: false })
   .then(() => {
      console.log('Tables created sucessfully')
      app.listen(PORT, () => {
         console.log('Server is Running')
      });
   })
   .catch((err) => console.log(err))