const express = require('express');
const { registeration, loginUser, getUser } = require('../Controllers/auth_JWT/auth.controller');
const { authenticateToken, registerValidation, loginValidation } = require('../middlewares/auth_middleware/authValidation');
const router = express.Router();

router.post('/register' ,registerValidation, registeration);
router.post('/login' ,loginValidation, loginUser);
router.get('/userInfo' , authenticateToken , getUser);

module.exports = router;