import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (type, message, description = "") => {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, type, message, description }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div
                className="fixed z-100 flex flex-col gap-3 
                top-4 right-4 left-4 
                sm:left-auto sm:w-90"
            >
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
