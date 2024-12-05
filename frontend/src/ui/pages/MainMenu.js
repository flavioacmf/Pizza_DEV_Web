
import React, { useState } from "react";
import Modal from "../components/Modal";
import "../../styles/mainMenu.css";

const MainMenu = ({ onSelectOption, onLogout }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCadastroOption = (option) => {
        onSelectOption(option);
        handleCloseModal();
    };

    const menuOptions = [
        { label: "Cadastros", value: "cadastros", action: handleOpenModal },
        { label: "Pedidos", value: "pedidos" },
        { label: "Docs. Fiscais", value: "docsFiscais" },
        { label: "Relatórios", value: "relatorios" },
        { label: "Configurações", value: "configuracoes" },
        { label: "Suporte", value: "suporte" },
    ];

    return (
        <div className="main-menu">
            <div className="menu-sidebar">
                <div className="menu-options">
                    {menuOptions.map((option) => (
                        <button
                            key={option.value}
                            className="menu-button"
                            onClick={option.action || (() => onSelectOption(option.value))}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <div className="logout-container">
                    <button className="logout-button" onClick={onLogout}>
                        Sair
                    </button>
                </div>
            </div>

            <div className="logo-container">
                <img src="/assets/pizza_logo.png" alt="Pizza Dev" className="main-logo" />
            </div>

            <Modal
                title="Cadastros"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <button onClick={() => handleCadastroOption("categorias")}>
                    Categorias
                </button>
                <button onClick={() => handleCadastroOption("clientes")}>
                    Clientes
                </button>
                <button onClick={() => handleCadastroOption("produtos")}>
                    Produtos
                </button>
                <button onClick={() => handleCadastroOption("subcategorias")}>
                    Subcategorias
                </button>
                <button onClick={() => handleCadastroOption("inativos")}>
                    Inativos
                </button>
            </Modal>
        </div>
    );
};

export default MainMenu;
