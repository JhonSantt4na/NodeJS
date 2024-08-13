const express = require('express');
const cors = require('cors');

const app = express()

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ Credentials: true, origin: "http://localhost:3000" }))

// Public folder for images 
app.use(express.static('public'))

// Routers
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)



app.listen(5000);