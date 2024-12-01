const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Listar todos os pedidos
exports.listarPedidos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('pedido')
            .select(`
                numero_pedido,
                cliente_codigo,
                atendente_codigo,
                forma_pagamento_codigo,
                data_pedido,
                total,
                status,
                cliente(nome),
                usuario(nome)
            `);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Criar um novo pedido
exports.criarPedido = async (req, res) => {
    const { cliente_codigo, atendente_codigo, forma_pagamento_codigo, total, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('pedido')
            .insert([{ cliente_codigo, atendente_codigo, forma_pagamento_codigo, total, status }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar um pedido existente
exports.atualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const { data, error } = await supabase.from('pedido').update({ status }).eq('numero_pedido', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir um pedido
exports.excluirPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase.from('pedido').delete().eq('numero_pedido', id);
        if (error) throw error;
        res.status(200).json({ message: "Pedido excluído com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
