const express = require('express')

const router = express.Router()
const userController = require('../controller/userController')
const protecter = require('../middleware/authorization')
router.post('/createaccount', userController.createAcc)
router.post('/login',userController.login, userController.userDetails)
router.get('/user_details', protecter.checkAuthToken, userController.userDetails)
module.exports = router