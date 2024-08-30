const express = require('express')
const router = express.Router()
const UserController = require('./controllers/CustomerController');

router.get('/all', UserController.GetAll);


module.exports = router;

