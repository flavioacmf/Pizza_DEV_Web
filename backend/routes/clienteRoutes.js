const express = require('express');
const router = express.Router();
const { verificarAutenticacao } = require('../middlewares/authMiddleware');
const { listarClientes, criarCliente, atualizarCliente, excluirCliente } = require('../controllers/clienteController');

// Rota para listar clientes
router.get('/', verificarAutenticacao, listarClientes);

// Rota para criar um cliente
router.post('/', verificarAutenticacao, criarCliente);

// Rota para atualizar um cliente
router.put('/:id', verificarAutenticacao, atualizarCliente);

// Rota para excluir um cliente
router.delete('/:id', verificarAutenticacao, excluirCliente);

module.exports = router;
