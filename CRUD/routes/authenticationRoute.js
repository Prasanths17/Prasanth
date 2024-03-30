const express = require('express');
const { registeration, loginUser, getUser } = require('../Controllers/auth_JWT/auth.controller');
const { authenticateToken } = require('../middlewares/auth_middleware/authValidation');
const router = express.Router();

router.post('/register' , registeration);
router.post('/login' , loginUser);
router.get('/userInfo' , authenticateToken , getUser);

module.exports = router;