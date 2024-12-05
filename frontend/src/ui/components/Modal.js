import React from "react";
import "../../styles/modal.css";

const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
