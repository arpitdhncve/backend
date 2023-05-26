const express = require('express');
const userController = require('../controller/userController')

const router = express.Router();
router.get('/', userController.check)
router.post('/loginRegister', userController.loginRegister)
router.post('/verifyOtp',userController.verifyOtp)

module.exports = router;