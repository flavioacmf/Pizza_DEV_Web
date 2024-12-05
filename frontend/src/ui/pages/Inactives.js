import React, { useState } from "react";
import "../../styles/inactives.css";

const Inactives = ({ data, setData, onBack }) => {
    const [selectedSection, setSelectedSection] = useState("categorias");

    const sections = [
        { label: "Categorias", value: "categorias" },
        { label: "Clientes", value: "clientes" },
        { label: "Produtos", value: "produtos" },
        { label: "Subcategorias", value: "subcategorias" },
    ];

    const handleReactivate = (index) => {
        const updatedData = [...data];
        updatedData[index].isActive = true; // Reativa o item
        setData(updatedData);
    };

    return (
        <div className="inactives-page">
            <button className="back-button" onClick={onBack}>
                Voltar
            </button>
            <h1>Itens Inativos</h1>
            <div className="menu">
                {sections.map((section) => (
                    <button
                        key={section.value}
                        className={`menu-button ${
                            selectedSection === section.value ? "active" : ""
                        }`}
                        onClick={() => setSelectedSection(section.value)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
            <ul className="inactive-list">
                {data
                    .filter((item) => !item.isActive && item.type === selectedSection)
                    .map((item, index) => (
                        <li key={index} className="inactive-item">
                            <div>
                                <strong>{item.name}</strong>
                                <p>{item.description}</p>
                            </div>
                            <button onClick={() => handleReactivate(index)}>Reativar</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Inactives;
