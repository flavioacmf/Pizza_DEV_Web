const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const { data, error } = await supabase.from('cliente').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Criar um novo cliente
exports.criarCliente = async (req, res) => {
    const { nome, cpf_cnpj, telefone, email, endereco_codigo } = req.body;

    try {
        const { data, error } = await supabase.from('cliente').insert([
            { nome, cpf_cnpj, telefone, email, endereco_codigo }
        ]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar cliente
exports.atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;

    try {
        const { data, error } = await supabase
            .from('cliente')
            .update({ nome, telefone, email })
            .eq('codigo', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir cliente
exports.excluirCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase.from('cliente').delete().eq('codigo', id);
        if (error) throw error;
        res.status(200).json({ message: "Cliente excluído com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
