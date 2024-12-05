const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('produto')
            .select('codigo, nome, descricao, tamanho, preco, categoria_codigo, subcategoria_codigo, imagem');
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Criar um novo produto
exports.criarProduto = async (req, res) => {
    const { nome, descricao, tamanho, preco, categoria_codigo, subcategoria_codigo, imagem } = req.body;

    try {
        const { data, error } = await supabase
            .from('produto')
            .insert([{ nome, descricao, tamanho, preco, categoria_codigo, subcategoria_codigo, imagem }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar um produto existente
exports.atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, tamanho, preco, categoria_codigo, subcategoria_codigo, imagem } = req.body;

    try {
        const { data, error } = await supabase
            .from('produto')
            .update({ nome, descricao, tamanho, preco, categoria_codigo, subcategoria_codigo, imagem })
            .eq('codigo', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir um produto
exports.excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase.from('produto').delete().eq('codigo', id);
        if (error) throw error;
        res.status(200).json({ message: "Produto excluído com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
