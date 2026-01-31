import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LoaderProvider } from "./context/LoaderContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <LoaderProvider>
            <ToastProvider>
                <ThemeProvider>
                    <StrictMode>
                        <App />
                    </StrictMode>
                </ThemeProvider>
            </ToastProvider>
        </LoaderProvider>
    </AuthProvider>,
);
