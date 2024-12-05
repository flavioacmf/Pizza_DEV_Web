import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../styles/viewOrders.css";

const ViewOrders = ({ onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscar pedidos via HTTP
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://pizzadev.free.beeceptor.com/orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Função para exportar pedidos para PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título do PDF
        doc.text("Relatório de Pedidos", 14, 10);

        // Gerar tabela com os pedidos
        const tableData = orders.map((order) => [
            order.id,
            order.client,
            `R$ ${order.total.toFixed(2)}`,
            order.status,
            order.products.map((p) => `${p.name} (x${p.quantity})`).join(", "),
        ]);

        doc.autoTable({
            head: [["ID", "Cliente", "Total", "Status", "Produtos"]],
            body: tableData,
            startY: 20,
        });

        // Salvar o PDF
        doc.save("relatorio-pedidos.pdf");
    };

    return (
        <div className="view-orders-page">
            <div className="header-buttons">
                <button className="back-button" onClick={onBack}>
                    Voltar
                </button>
                <button className="export-button" onClick={exportToPDF}>
                    Exportar para PDF
                </button>
            </div>
            <h1>Consulta de Pedidos</h1>
            {loading ? (
                <p>Carregando pedidos...</p>
            ) : (
                <div className="orders-grid">
                    {orders.map((order) => (
                        <div className="order-card" key={order.id}>
                            <h2>Pedido #{order.id}</h2>
                            <p><strong>Cliente:</strong> {order.client}</p>
                            <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} x {product.quantity} = R$ {(product.price * product.quantity).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewOrders;
