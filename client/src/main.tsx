import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Глобальные стили — до App, чтобы стили компонентов шли после reset и могли его переопределять
import "./styles/index.css";

import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
