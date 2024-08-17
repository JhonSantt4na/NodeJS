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
const PetsRoutes = require('./routes/PetsRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetsRoutes)

app.listen(5000); 