const express = require('express');
const { 
    register,
     login,
    forgotPassword,
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

module.exports = router;