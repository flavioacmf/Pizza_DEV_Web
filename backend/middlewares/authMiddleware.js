// Middleware para verificar autenticação
exports.verificarAutenticacao = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    try {
        // Simula a validação do token. Adicione lógica real conforme necessário.
        console.log("Token recebido:", token);

        if (token !== "fake-token") {
            throw new Error("Token inválido ou expirado.");
        }

        // Permitir que a rota prossiga
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
