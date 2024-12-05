import React from "react";
import "../../styles/underConstruction.css";

const UnderConstruction = ({ onBack }) => {
    return (
        <div className="under-construction-page">
            <div className="under-construction-container">
                <h1>🚧 Em Construção 🚧</h1>
                <p>Estamos trabalhando nesta funcionalidade. Por favor, volte mais tarde!</p>
                <button className="back-button" onClick={onBack}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default UnderConstruction;
