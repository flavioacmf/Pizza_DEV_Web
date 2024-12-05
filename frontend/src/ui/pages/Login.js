import React, { useState } from "react";
import "../../styles/login.css"; // Importando os estilos

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "123456") {
            setError("");
            onLoginSuccess({ username }); // Simula sucesso no login
        } else {
            setError("Usuário ou senha inválidos.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src="/assets/pizza_logo2.png" alt="Pizza Dev" className="logo" />
                    <h1>Login</h1>
                </div>
                <div className="login-right">
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
