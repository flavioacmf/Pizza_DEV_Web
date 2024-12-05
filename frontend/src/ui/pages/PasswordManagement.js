import React, { useState } from "react";
import "../../styles/passwordManagement.css";

const PasswordManagement = ({ onBack }) => {
    const [view, setView] = useState("alterarSenha"); // Alterna entre "alterarSenha" e "cadastrar"

    // Estados para alterar senha
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // Estados para cadastrar novo usuário
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [confirmNewUserPassword, setConfirmNewUserPassword] = useState("");
    const [role, setRole] = useState("atendente"); // Valor padrão: Atendente

    const handlePasswordChange = () => {
        if (newPassword !== confirmNewPassword) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }
        alert("Senha alterada com sucesso!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    };

    const handleNewUserCreation = () => {
        if (newUserPassword !== confirmNewUserPassword) {
            alert("A senha do novo usuário e a confirmação não coincidem.");
            return;
        }
        alert(`Novo usuário "${newUserName}" criado com sucesso como ${role}!`);
        setNewUserName("");
        setNewUserPassword("");
        setConfirmNewUserPassword("");
        setRole("atendente"); // Reseta o papel para Atendente
    };

    return (
        <div className="password-management-page">
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>
            <h1>Plano de Senhas</h1>

            {/* Menu de Opções */}
            <div className="menu-options">
                <button
                    className={`menu-button ${view === "alterarSenha" ? "active" : ""}`}
                    onClick={() => setView("alterarSenha")}
                >
                    Alterar Senha
                </button>
                <button
                    className={`menu-button ${view === "cadastrar" ? "active" : ""}`}
                    onClick={() => setView("cadastrar")}
                >
                    Cadastrar Novo Usuário
                </button>
            </div>

            {/* Área de Conteúdo */}
            <div className="content-section">
                {view === "alterarSenha" ? (
                    <div className="password-change-section">
                        <h2>Alterar Senha</h2>
                        <input
                            type="password"
                            placeholder="Senha Atual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Nova Senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirmar Nova Senha"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <button onClick={handlePasswordChange}>Alterar Senha</button>
                    </div>
                ) : (
                    <div className="new-user-section">
                        <h2>Cadastrar Novo Usuário</h2>
                        <input
                            type="text"
                            placeholder="Nome do Novo Usuário"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha do Novo Usuário"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirmar Senha do Novo Usuário"
                            value={confirmNewUserPassword}
                            onChange={(e) => setConfirmNewUserPassword(e.target.value)}
                            required
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="atendente">Atendente</option>
                            <option value="administrador">Administrador</option>
                        </select>
                        <button onClick={handleNewUserCreation}>Criar Novo Usuário</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordManagement;
