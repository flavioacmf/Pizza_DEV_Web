const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// Rota para login
router.post('/login', login);

// Rota para registro de usuários
router.post('/register', register);

module.exports = router;
