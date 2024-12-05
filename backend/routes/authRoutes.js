const express = require('express');
const { body, validationResult } = require('express-validator');
const { login, register } = require('../controllers/authController');

const router = express.Router();

// Middleware para validar campos de login
const validarLogin = [
    body('nome').notEmpty().withMessage('O campo "nome" é obrigatório.'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
];

// Rota de login com validação
router.post('/login', validarLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Prossegue para o controller se a validação passar
}, login);

// Rota de registro (exemplo semelhante)
router.post('/register', [
    body('nome').notEmpty().withMessage('O campo "nome" é obrigatório.'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    body('papel').isIn(['admin', 'usuario']).withMessage('O papel deve ser "admin" ou "usuario".')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, register);

module.exports = router;
