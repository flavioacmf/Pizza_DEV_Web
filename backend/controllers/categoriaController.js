const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Listar categorias com o primeiro produto ativo
exports.listarCategorias = async (req, res) => {
    try {
        // Passo 1: Buscar todas as categorias
        const { data: categorias, error: categoriasError } = await supabase.from('categoria').select('*');
        if (categoriasError) throw categoriasError;

        // Passo 2: Para cada categoria, buscar o primeiro produto ativo
        const categoriasComProduto = await Promise.all(
            categorias.map(async (categoria) => {
                const { data: produto, error: produtoError } = await supabase
                    .from('produto')
                    .select('nome')
                    .eq('categoria_codigo', categoria.codigo) // Relaciona pelo código da categoria
                    .eq('inativo', false) // Busca apenas produtos ativos
                    .order('codigo', { ascending: true }) // Ordena pelo código do produto
                    .limit(1); // Retorna apenas o primeiro produto

                if (produtoError) throw produtoError;

                // Adiciona o primeiro produto ativo à categoria
                return {
                    ...categoria,
                    primeiro_produto_ativo: produto.length > 0 ? produto[0].nome : null,
                };
            })
        );

        // Retornar as categorias com o produto
        res.status(200).json(categoriasComProduto);
    } catch (err) {
        console.error('Erro ao listar categorias:', err.message);
        res.status(400).json({ error: 'Erro ao listar categorias' });
    }
};

// Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
    const { nome, descricao } = req.body;

    try {
        const { data, error } = await supabase.from('categoria').insert([{ nome, descricao }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar categoria
exports.atualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
        const { data, error } = await supabase
            .from('categoria')
            .update({ nome, descricao })
            .eq('codigo', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir categoria
exports.excluirCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase.from('categoria').delete().eq('codigo', id);
        if (error) throw error;
        res.status(200).json({ message: "Categoria excluída com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
