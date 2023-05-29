const express = require('express');
const userController = require('../controller/userController')
const contentController = require('../controller/contentController')

const router = express.Router();
router.get('/', userController.check)
router.post('/loginRegister', userController.loginRegister)
router.post('/verifyOtp',userController.verifyOtp)
router.post('/uploadBhajan',contentController.uploadBhajan)



module.exports = router;