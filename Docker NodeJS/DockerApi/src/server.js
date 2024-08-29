import express from 'express';
import userRoutes from './routes.js'

const app = express();

app.use(express.json());

app.use('/usuarios', userRoutes)

app.listen(5000, () => console.log(
   `http://localhost:5000/usuarios/all`
))