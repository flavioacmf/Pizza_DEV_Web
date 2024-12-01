require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rotas
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação
const clienteRoutes = require('./routes/clienteRoutes'); // Rotas de clientes
const categoriaRoutes = require('./routes/categoriaRoutes'); // Rotas de categorias
const produtoRoutes = require('./routes/produtoRoutes'); // Rotas de produtos
const pedidoRoutes = require('./routes/pedidoRoutes'); // Rotas de pedidos

// Inicialização do servidor
const app = express();
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Habilitar JSON no body das requisições

// Usar as rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/clientes', clienteRoutes); // Rotas de clientes
app.use('/categorias', categoriaRoutes); // Rotas de categorias
app.use('/produtos', produtoRoutes); // Rotas de produtos
app.use('/pedidos', pedidoRoutes); // Rotas de pedidos

// Inicializar servidor na porta configurada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
