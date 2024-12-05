import React, { useState } from "react";
import "../../styles/orders.css";

const Orders = ({ clients = [], products = [], orders = [], setOrders, onBack, onViewOrders }) => {
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [cashGiven, setCashGiven] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderStatus, setOrderStatus] = useState("Aberto");
    const [activeTab, setActiveTab] = useState("Produtos");

    const handleAddProduct = () => {
        if (!selectedProduct) {
            alert("Selecione um produto!");
            return;
        }

        const product = products.find((p) => String(p.id) === selectedProduct);
        if (!product) {
            alert("Produto inválido!");
            return;
        }

        setSelectedProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + productQuantity }
                        : p
                );
            }
            return [...prevProducts, { ...product, quantity: productQuantity }];
        });

        setSelectedProduct("");
        setProductQuantity(1);
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    const calculateSubtotal = () =>
        selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const calculateTotal = () => calculateSubtotal() - discount;

    const calculateChange = () => Math.max(0, cashGiven - calculateTotal());

    const handleSaveOrder = () => {
        if (!selectedClient) {
            alert("Selecione um cliente.");
            return;
        }

        if (selectedProducts.length === 0) {
            alert("Adicione ao menos um produto ao pedido.");
            return;
        }

        const newOrder = {
            client: selectedClient,
            products: selectedProducts,
            total: calculateTotal(),
            status: orderStatus,
        };

        setOrders([...orders, newOrder]);
        resetOrder();
        alert("Pedido salvo com sucesso!");
        onViewOrders(); // Redireciona para a visualização de pedidos
    };

    const resetOrder = () => {
        setSelectedClient("");
        setSelectedProducts([]);
        setDiscount(0);
        setCashGiven(0);
        setPaymentMethod("");
        setOrderStatus("Aberto");
        setActiveTab("Produtos");
    };

    return (
        <div className="orders-page">
            <div className="header-buttons">
                <button className="back-button" onClick={onBack}>
                    Voltar
                </button>
                <button className="view-orders-button" onClick={onViewOrders}>
                    Ver Todos os Pedidos
                </button>
            </div>

            <h1>Gerenciamento de Pedidos</h1>

            {!selectedClient && (
                <div className="client-selection">
                    <label htmlFor="client-select">Selecione o Cliente:</label>
                    <select
                        id="client-select"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                    >
                        <option value="">Selecione um Cliente</option>
                        {clients.map((client, index) => (
                            <option key={index} value={client.name}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedClient && <h2>Cliente: {selectedClient}</h2>}

            {selectedClient && (
                <div className="tab-menu">
                    {["Produtos", "Fechamento", "Pagamento", "Status"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {activeTab === "Produtos" && selectedClient && (
                <div className="tab-content">
                    <div className="product-selection">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option value="">Selecione um Produto</option>
                            {products.map((product) => (
                                <option key={product.id} value={String(product.id)}>
                                    {product.name} - R$ {product.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={productQuantity}
                            min="1"
                            onChange={(e) => setProductQuantity(Number(e.target.value))}
                            placeholder="Quantidade"
                        />
                        <button onClick={handleAddProduct}>Adicionar</button>
                    </div>

                    <ul className="selected-products-list">
                        {selectedProducts.map((product) => (
                            <li key={product.id}>
                                <div>
                                    <strong>{product.name}</strong> - R$ {product.price.toFixed(2)} x{" "}
                                    {product.quantity}                                     = R$ {(product.price * product.quantity).toFixed(2)}
                                </div>
                                <button onClick={() => handleRemoveProduct(product.id)}>
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p>Subtotal: R$ {calculateSubtotal().toFixed(2)}</p>
                </div>
            )}

            {activeTab === "Fechamento" && selectedClient && (
                <div className="tab-content">
                    <p>Subtotal: R$ {calculateSubtotal().toFixed(2)}</p>
                    <label>
                        Desconto:
                        <input
                            type="number"
                            value={discount}
                            min="0"
                            onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                    </label>
                    <p>Total: R$ {calculateTotal().toFixed(2)}</p>
                    <label>
                        Troco para:
                        <input
                            type="number"
                            value={cashGiven}
                            min="0"
                            onChange={(e) => setCashGiven(Number(e.target.value))}
                        />
                    </label>
                    <p>Troco: R$ {calculateChange().toFixed(2)}</p>
                </div>
            )}

            {activeTab === "Pagamento" && selectedClient && (
                <div className="tab-content">
                    <label>
                        Forma de Pagamento:
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="dinheiro">Dinheiro</option>
                            <option value="cartao">Cartão</option>
                            <option value="pix">Pix</option>
                        </select>
                    </label>
                    <p>Valor Total: R$ {calculateTotal().toFixed(2)}</p>
                </div>
            )}

            {activeTab === "Status" && selectedClient && (
                <div className="tab-content">
                    <label>
                        Status do Pedido:
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <option value="Aberto">Aberto</option>
                            <option value="Em produção">Em produção</option>
                            <option value="Em entrega">Em entrega</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </label>
                </div>
            )}

            <button onClick={handleSaveOrder} className="save-order-button">
                Salvar Pedido
            </button>
        </div>
    );
};

export default Orders;
