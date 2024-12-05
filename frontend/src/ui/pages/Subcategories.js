import React, { useState } from "react";
import "../../styles/subcategories.css";

const Subcategories = ({ data, setData, categories = [], onBack }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    // Adicionar ou atualizar subcategoria
    const handleSaveSubcategory = (e) => {
        e.preventDefault();

        const newSubcategory = {
            name,
            category,
            isActive: true,
            type: "subcategorias",
        };

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = { ...updatedData[editingIndex], ...newSubcategory };
            setData(updatedData);
            setEditingIndex(null);
        } else {
            setData([...data, newSubcategory]);
        }

        console.log("Nova Subcategoria:", newSubcategory); // Log para depuração
        setName("");
        setCategory("");
    };

    // Editar subcategoria
    const handleEditSubcategory = (index) => {
        const subcategory = data[index];
        setName(subcategory.name || "");
        setCategory(subcategory.category || "");
        setEditingIndex(index);
    };

    // Excluir subcategoria
    const handleDeleteSubcategory = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    // Inativar subcategoria
    const handleInactivateSubcategory = (index) => {
        const updatedData = [...data];
        if (updatedData[index]) {
            updatedData[index].isActive = false;
            setData(updatedData);
        }
    };

    // Filtrar subcategorias com base no termo de pesquisa
    const filteredSubcategories = data.filter((subcategory) => {
        const subcategoryName = subcategory.name?.toLowerCase() || "";
        const subcategoryCategory = subcategory.category?.toLowerCase() || "";

        return (
            subcategory.isActive &&
            subcategory.type === "subcategorias" &&
            (subcategoryName.includes(searchTerm.toLowerCase()) ||
                subcategoryCategory.includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="subcategories-page">
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>
            <h1>Gerenciamento de Subcategorias</h1>
            {/* Barra de Pesquisa */}
            <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar subcategorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <form onSubmit={handleSaveSubcategory} className="subcategory-form">
                <input
                    type="text"
                    placeholder="Nome da Subcategoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Selecione uma Categoria</option>
                    {categories
                        .filter((cat) => cat.isActive && cat.type === "categorias") // Filtra categorias ativas
                        .map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                </select>
                <button type="submit">
                    {editingIndex !== null ? "Atualizar" : "Cadastrar"}
                </button>
            </form>
            <ul className="subcategory-list">
                {filteredSubcategories.map((subcategory, index) => (
                    <li key={index} className="subcategory-item">
                        <div>
                            <strong>{subcategory.name}</strong>
                            <p>Categoria: {subcategory.category}</p>
                        </div>
                        <div className="subcategory-actions">
                            <button onClick={() => handleEditSubcategory(index)}>
                                Editar
                            </button>
                            <button onClick={() => handleDeleteSubcategory(index)}>
                                Excluir
                            </button>
                            <button onClick={() => handleInactivateSubcategory(index)}>
                                Inativar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subcategories;
