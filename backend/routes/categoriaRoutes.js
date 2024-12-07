const express = require('express');
const router = express.Router();
//const { verificarAutenticacao } = require('../middlewares/authMiddleware');
const { 
    listarCategorias, 
    criarCategoria, 
    atualizarCategoria, 
    excluirCategoria 
} = require('../controllers/categoriaController');

// Rota para listar categorias com o primeiro produto ativo
router.get('/', /*verificarAutenticacao,*/ listarCategorias);

// Rota para criar uma nova categoria
router.post('/', /*verificarAutenticacao,*/ criarCategoria);

// Rota para atualizar uma categoria existente
router.put('/:id', /*verificarAutenticacao,*/ atualizarCategoria);

// Rota para excluir uma categoria
router.delete('/:id', /*verificarAutenticacao,*/ excluirCategoria);

module.exports = router;
