const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt'); // Para hashear senhas

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Login de usuário usando nome
exports.login = async (req, res) => {
    const { nome, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const { data, error } = await supabase
            .from('usuario')
            .select('codigo, nome, senha, papel, inativo')
            .eq('nome', nome)
            .single();

        if (error || !data) {
            return res.status(401).json({ error: "Usuário ou senha inválidos." });
        }

        const usuario = data;

        // Verifica se o usuário está inativo
        if (usuario.inativo) {
            return res.status(403).json({ error: "Usuário inativo." });
        }

        // Valida a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Usuário ou senha inválidos." });
        }

        // Retorna os dados do usuário autenticado
        res.status(200).json({
            message: "Login realizado com sucesso!",
            user: {
                codigo: usuario.codigo,
                nome: usuario.nome,
                papel: usuario.papel
            },
            token: "fake-jwt-token" // Substitua por JWT real
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Registro de novo usuário usando nome
exports.register = async (req, res) => {
    const { nome, senha, papel } = req.body;

    try {
        // Gera hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere o novo usuário no banco
        const { error } = await supabase
            .from('usuario')
            .insert([{ nome, senha: hashedPassword, papel }]);

        if (error) throw error;

        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user: { nome, papel }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
