import React, { useState } from "react";
import "../../styles/categories.css";

const Categories = ({ data = [], setData, onBack }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Termo para barra de pesquisa
    const [editingIndex, setEditingIndex] = useState(null);

    // Adicionar ou atualizar categoria
    const handleSaveCategory = (e) => {
        e.preventDefault();

        const newCategory = {
            name,
            description,
            isActive: true,
            type: "categorias", // Garante que o tipo seja sempre "categorias"
        };

        if (editingIndex !== null) {
            // Atualizar categoria existente
            const updatedData = [...data];
            updatedData[editingIndex] = { ...updatedData[editingIndex], ...newCategory };
            setData(updatedData);
            setEditingIndex(null);
        } else {
            // Adicionar nova categoria
            setData([...data, newCategory]);
        }

        console.log("Nova Categoria Salva:", newCategory); // Log para depuração
        setName("");
        setDescription("");
    };

    // Editar categoria
    const handleEditCategory = (index) => {
        const category = data[index];
        setName(category.name || "");
        setDescription(category.description || "");
        setEditingIndex(index);
    };

    // Excluir categoria
    const handleDeleteCategory = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    // Inativar categoria
    const handleInactivateCategory = (index) => {
        const updatedData = [...data];
        if (updatedData[index]) {
            updatedData[index].isActive = false;
            setData(updatedData);
        }
    };

    // Filtrar categorias com base no termo de pesquisa
    const filteredCategories = data.filter((category) => {
        const categoryName = category.name?.toLowerCase() || "";
        const categoryDescription = category.description?.toLowerCase() || "";

        return (
            category.isActive && // Apenas categorias ativas
            category.type === "categorias" && // Apenas itens do tipo "categorias"
            (categoryName.includes(searchTerm.toLowerCase()) || 
             categoryDescription.includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="categories-page">
            {/* Botão de voltar */}
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>

            <h1>Gerenciamento de Categorias</h1>

            {/* Barra de Pesquisa */}
            <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Formulário de Cadastro e Edição */}
            <form onSubmit={handleSaveCategory} className="category-form">
                <input
                    type="text"
                    placeholder="Nome da Categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição da Categoria"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">
                    {editingIndex !== null ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            {/* Listagem de Categorias */}
            <ul className="category-list">
                {filteredCategories.map((category, index) => (
                    <li key={index} className="category-item">
                        <div>
                            <strong>{category.name}</strong>
                            <p>{category.description}</p>
                        </div>
                        <div className="category-actions">
                            <button onClick={() => handleEditCategory(index)}>Editar</button>
                            <button onClick={() => handleDeleteCategory(index)}>Excluir</button>
                            <button onClick={() => handleInactivateCategory(index)}>Inativar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
