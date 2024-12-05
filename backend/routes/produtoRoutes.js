const express = require('express');
const router = express.Router();
const { verificarAutenticacao } = require('../middlewares/authMiddleware');
const { listarProdutos, criarProduto, atualizarProduto, excluirProduto } = require('../controllers/produtoController');

// Rota para listar produtos
router.get('/', verificarAutenticacao, listarProdutos);

// Rota para criar um produto
router.post('/', verificarAutenticacao, criarProduto);

// Rota para atualizar um produto
router.put('/:id', verificarAutenticacao, atualizarProduto);

// Rota para excluir um produto
router.delete('/:id', verificarAutenticacao, excluirProduto);

module.exports = router;
