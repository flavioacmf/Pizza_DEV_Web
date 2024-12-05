import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import App from "./App";

// Renderizando o componente raiz da aplicação
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove o código de métricas caso não seja necessário
