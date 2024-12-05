import React, { useState } from "react";
import "../../styles/clients.css";

const applyMaskCPF = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const applyMaskPhone = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
};

const applyMaskCEP = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{3})$/, "$1-$2");
};

const Clients = ({ data = [], setData, onBack }) => {
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    // Adicionar ou atualizar cliente
    const handleSaveClient = (e) => {
        e.preventDefault();

        const newClient = {
            name,
            cpfCnpj,
            email,
            phone,
            cep,
            address,
            houseNumber,
            neighborhood,
            city,
            state,
            isActive: true,
            type: "clientes",
        };

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = { ...updatedData[editingIndex], ...newClient };
            setData(updatedData);
            setEditingIndex(null);
        } else {
            setData([...data, newClient]);
        }

        console.log("Cliente salvo:", newClient); // Log para depuração
        handleResetForm();
    };

    // Resetar formulário
    const handleResetForm = () => {
        setName("");
        setCpfCnpj("");
        setEmail("");
        setPhone("");
        setCep("");
        setAddress("");
        setHouseNumber("");
        setNeighborhood("");
        setCity("");
        setState("");
    };

    // Editar cliente
    const handleEditClient = (index) => {
        const client = data[index];
        setName(client.name || "");
        setCpfCnpj(client.cpfCnpj || "");
        setEmail(client.email || "");
        setPhone(client.phone || "");
        setCep(client.cep || "");
        setAddress(client.address || "");
        setHouseNumber(client.houseNumber || "");
        setNeighborhood(client.neighborhood || "");
        setCity(client.city || "");
        setState(client.state || "");
        setEditingIndex(index);
    };

    // Excluir cliente
    const handleDeleteClient = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    // Inativar cliente
    const handleInactivateClient = (index) => {
        const updatedData = [...data];
        if (updatedData[index]) {
            updatedData[index].isActive = false;
            setData(updatedData);
        }
    };

    // Filtrar clientes com base no termo de pesquisa
    const filteredClients = data.filter((client) => {
        const clientName = client.name?.toLowerCase() || "";
        const clientEmail = client.email?.toLowerCase() || "";
        const clientCPF = client.cpfCnpj?.toLowerCase() || "";

        return (
            client.isActive &&
            client.type === "clientes" &&
            (clientName.includes(searchTerm.toLowerCase()) ||
                clientEmail.includes(searchTerm.toLowerCase()) ||
                clientCPF.includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="clients-page">
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>
            <h1>Gerenciamento de Clientes</h1>

            {/* Barra de Pesquisa */}
            <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Formulário de Cadastro */}
            <form onSubmit={handleSaveClient} className="client-form">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="CPF/CNPJ"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(applyMaskCPF(e.target.value))}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(applyMaskPhone(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(applyMaskCEP(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nº Casa"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button type="submit">
                    {editingIndex !== null ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            {/* Listagem de Clientes */}
            <ul className="client-list">
                {filteredClients.map((client, index) => (
                    <li key={index} className="client-item">
                        <div>
                            <strong>{client.name}</strong>
                            <p>CPF/CNPJ: {client.cpfCnpj}</p>
                            <p>Email: {client.email}</p>
                            <p>Telefone: {client.phone}</p>
                            <p>CEP: {client.cep}</p>
                            <p>Endereço: {client.address}, Nº {client.houseNumber}</p>
                            <p>Bairro: {client.neighborhood}, Cidade: {client.city}, Estado: {client.state}</p>
                        </div>
                        <div className="client-actions">
                            <button onClick={() => handleEditClient(index)}>Editar</button>
                            <button onClick={() => handleDeleteClient(index)}>Excluir</button>
                            <button onClick={() => handleInactivateClient(index)}>Inativar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clients;
