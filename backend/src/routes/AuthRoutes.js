const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/authMiddleware');


router.post('/login', AuthController.loginUser);
router.post('/logout', verifyToken, AuthController.logoutUser);


module.exports = router;