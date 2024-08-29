import { Router } from 'express';
import { createUser, getAllUser, updateUser, deleteUser } from './Controllers/UserControllers.js'

const router = Router()


router.post('/cadastro', createUser)

router.get('/all', getAllUser)

router.patch('/update', updateUser)

router.delete('/delete', deleteUser)


export default router