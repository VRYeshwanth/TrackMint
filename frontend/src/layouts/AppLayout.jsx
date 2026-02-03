import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
    }, [isOpen]);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col">
                <header className="md:hidden h-14 flex items-center px-4 border-b border-(--border-default) bg-(--app-bg) text-(--text-primary)">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center cursor-pointer"
                    >
                        <span className="material-symbols-rounded text-3xl">
                            menu
                        </span>
                    </button>
                    <h1 className="ml-4 font-semibold text-lg">TrackMint</h1>
                </header>

                <main className="flex-1 p-4 md:p-6 bg-(--app-bg)">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
