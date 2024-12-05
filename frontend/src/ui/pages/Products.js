import React, { useState } from "react";
import "../../styles/products.css";

const Products = ({ data = [], setData, categories = [], subcategories = [], onBack }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    const handleSaveProduct = (e) => {
        e.preventDefault();

        if (!category || !subcategory) {
            alert("Por favor, selecione uma categoria e subcategoria.");
            return;
        }

        const newProduct = {
            name,
            description,
            category,
            subcategory,
            size,
            price: parseFloat(price),
            isActive: true,
            type: "produtos",
        };

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = { ...updatedData[editingIndex], ...newProduct };
            setData(updatedData);
            setEditingIndex(null);
        } else {
            setData([...data, newProduct]);
        }

        // Resetar formulário
        setName("");
        setDescription("");
        setCategory("");
        setSubcategory("");
        setSize("");
        setPrice("");
    };

    return (
        <div className="products-page">
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>
            <h1>Gerenciamento de Produtos</h1>
            <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <form onSubmit={handleSaveProduct} className="product-form">
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Selecione uma Categoria</option>
                    {categories
                        .filter((cat) => cat.isActive && cat.type === "categorias")
                        .map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                </select>
                <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                >
                    <option value="">Selecione uma Subcategoria</option>
                    {subcategories
                        .filter((subcat) => subcat.isActive && subcat.type === "subcategorias") // Exibir todas as subcategorias
                        .map((subcat, index) => (
                            <option key={index} value={subcat.name}>
                                {subcat.name}
                            </option>
                        ))}
                </select>
                <input
                    type="text"
                    placeholder="Tamanho"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingIndex !== null ? "Atualizar" : "Cadastrar"}
                </button>
            </form>
        </div>
    );
};

export default Products;
