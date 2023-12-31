const express = require('express')
const userController = require('../controllers/userController')
const { signup, login } = userController
const router = express.Router()

router.post('/signup', signup) 

router.post('/login', login )

module.exports = router;