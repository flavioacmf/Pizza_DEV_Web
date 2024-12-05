import React, { useState } from "react";
import Login from "./ui/pages/Login";
import MainMenu from "./ui/pages/MainMenu";
import Categories from "./ui/pages/Categories";
import Clients from "./ui/pages/Clients";
import Subcategories from "./ui/pages/Subcategories";
import Products from "./ui/pages/Products";
import Inactives from "./ui/pages/Inactives";
import SettingsModal from "./ui/pages/SettingsModal"; // Modal de configurações
import PasswordManagement from "./ui/pages/PasswordManagement"; // Tela de Plano de Senhas
import Orders from "./ui/pages/Orders"; // Tela de Pedidos
import ViewOrders from "./ui/pages/ViewOrders"; // Tela de Visualização de Pedidos
import UnderConstruction from "./ui/pages/UnderConstruction"; // Tela Em Construção

function App() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // Controle do modal de configurações

    // Estados separados
    const [categories, setCategories] = useState([]);
    const [clients, setClients] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]); // Adicionando estado para pedidos

    // Função para quando o usuário fizer login
    const handleLoginSuccess = (loggedUser) => {
        setUser(loggedUser);
    };

    // Seleciona uma opção no menu principal
    const handleSelectOption = (option) => {
        if (option === "configuracoes") {
            setIsSettingsModalOpen(true); // Abre o modal de configurações
        } else {
            setSelectedOption(option);
        }
    };

    // Fecha o modal de configurações
    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    // Desloga o usuário
    const handleLogout = () => {
        setUser(null);
        setSelectedOption(null);
    };

    // Volta ao menu principal
    const handleBackToMenu = () => {
        setSelectedOption(null);
    };

    // Redireciona para a tela de consulta de pedidos
    const handleViewOrders = () => {
        setSelectedOption("viewOrders");
    };

    return (
        <div className="App">
            {/* Tela de Login */}
            {!user ? (
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : selectedOption === null ? (
                <>
                    {/* Menu Principal */}
                    <MainMenu onSelectOption={handleSelectOption} onLogout={handleLogout} />
                    {isSettingsModalOpen && (
                        <SettingsModal
                            onClose={handleCloseSettingsModal}
                            onOptionSelect={(option) => {
                                setIsSettingsModalOpen(false);
                                setSelectedOption(option);
                            }}
                        />
                    )}
                </>
            ) : selectedOption === "categorias" ? (
                <Categories
                    data={categories || []}
                    setData={setCategories}
                    onBack={handleBackToMenu}
                />
            ) : selectedOption === "clientes" ? (
                <Clients
                    data={clients || []}
                    setData={setClients}
                    onBack={handleBackToMenu}
                />
            ) : selectedOption === "subcategorias" ? (
                <Subcategories
                    data={subcategories || []}
                    setData={setSubcategories}
                    categories={categories || []}
                    onBack={handleBackToMenu}
                />
            ) : selectedOption === "produtos" ? (
                <Products
                    data={products || []}
                    setData={setProducts}
                    categories={categories || []} // Passando categorias
                    subcategories={subcategories || []} // Passando subcategorias
                    onBack={handleBackToMenu}
                />
            ) : selectedOption === "pedidos" ? (
                <Orders
                    clients={clients || []}
                    products={products || []}
                    orders={orders || []}
                    setOrders={setOrders}
                    onBack={handleBackToMenu}
                    onViewOrders={handleViewOrders} // Redireciona para ViewOrders
                />
            ) : selectedOption === "viewOrders" ? (
                <ViewOrders onBack={handleBackToMenu} /> // Tela de visualização de pedidos
            ) : selectedOption === "inativos" ? (
                <Inactives
                    data={[
                        ...(categories || []),
                        ...(clients || []),
                        ...(subcategories || []),
                        ...(products || []),
                    ]}
                    setData={(updatedData) => {
                        setCategories(
                            updatedData.filter((item) => item.type === "categorias")
                        );
                        setClients(
                            updatedData.filter((item) => item.type === "clientes")
                        );
                        setSubcategories(
                            updatedData.filter((item) => item.type === "subcategorias")
                        );
                        setProducts(
                            updatedData.filter((item) => item.type === "produtos")
                        );
                    }}
                    onBack={handleBackToMenu}
                />
            ) : selectedOption === "planoDeSenhas" ? (
                <PasswordManagement onBack={handleBackToMenu} />
            ) : (
                <UnderConstruction onBack={handleBackToMenu} />
            )}
        </div>
    );
}

export default App;
