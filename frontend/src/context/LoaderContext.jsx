import { createContext, useState, useContext } from "react";
import Loader from "../components/Loader.jsx";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoader = () => setLoadingCount((c) => c + 1);
    const hideLoader = () => setLoadingCount((c) => Math.max(0, c - 1));

    const isLoading = loadingCount > 0;

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}

            {/* 🔹 GLOBAL LOADER UI AUTOMATICALLY RENDERED */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-(--card-bg) rounded-3xl shadow-2xl px-12 py-10 flex flex-col items-center justify-center gap-5">
                        <Loader size={46} />
                        <p className="text-sm text-(--text-secondary) tracking-wide">
                            Loading...
                        </p>
                    </div>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
