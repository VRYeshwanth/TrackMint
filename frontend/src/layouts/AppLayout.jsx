import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
