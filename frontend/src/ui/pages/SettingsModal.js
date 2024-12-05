import React from "react";
import "../../styles/settings.css";

const SettingsModal = ({ onClose, onOptionSelect }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Configurações</h2>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <div className="modal-body">
                    <button
                        className="modal-option-button"
                        onClick={() => onOptionSelect("planoDeSenhas")}
                    >
                        Plano de Senhas
                    </button>
                    <button
                        className="modal-option-button"
                        onClick={() => onOptionSelect("emConstrucao")}
                    >
                        Configurações Gerais
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
