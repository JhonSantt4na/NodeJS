const express = require('express');
const cors = require('cors');

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ Credential: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes

app.listen(5000, () => {
   console.log('Serve is Run')
})