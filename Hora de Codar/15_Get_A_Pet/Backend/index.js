const express = require('express');
const cors = require('cors');

const UserRoutes = require('./routes/UserRoutes')

const app = express();

// Config Json response
app.use(express.json())

// Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.listen(5000, () => {
   console.log('Server is running')
})