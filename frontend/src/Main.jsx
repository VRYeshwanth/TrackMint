import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LoaderProvider } from "./context/LoaderContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
    <LoaderProvider>
        <ToastProvider>
            <StrictMode>
                <App />
            </StrictMode>
        </ToastProvider>
    </LoaderProvider>,
);
