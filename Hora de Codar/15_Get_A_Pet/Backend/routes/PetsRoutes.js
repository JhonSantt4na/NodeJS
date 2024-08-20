const router = require('express').Router()
const PetsController = require('../controllers/PetsController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post(
   "/create", imageUpload.array('images'),
   verifyToken, PetsController.create
)
router.get('/', PetsController.getAll)
router.get('/mypets', verifyToken, PetsController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetsController.getAllUserAdopitions)
router.get('/:id', PetsController.getPetById)
router.delete('/:id', verifyToken, PetsController.removePetById)


module.exports = router