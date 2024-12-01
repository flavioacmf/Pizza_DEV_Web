const express = require('express');
const router = express.Router();
const { verificarAutenticacao } = require('../middlewares/authMiddleware');
const { listarPedidos, criarPedido, atualizarPedido, excluirPedido } = require('../controllers/pedidoController');

// Rota para listar pedidos
router.get('/', verificarAutenticacao, listarPedidos);

// Rota para criar um novo pedido
router.post('/', verificarAutenticacao, criarPedido);

// Rota para atualizar um pedido existente
router.put('/:id', verificarAutenticacao, atualizarPedido);

// Rota para excluir um pedido
router.delete('/:id', verificarAutenticacao, excluirPedido);

module.exports = router;
