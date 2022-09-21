const express = require('express');
const authController = require("../controllers/auth");
const { 
    register,
     login,
    forgotPassword,
    resetPassword,
    } = require('../controllers/auth');
const router = express.Router();

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router
    .route('/forgotpassword')
    .post(forgotPassword);

router
.patch("/resetpassword/:token",authController.resetPassword);

module.exports = router;