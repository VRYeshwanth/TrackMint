import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="w-64 h-screen border-r flex flex-col justify-between p-4">
            <div>
                <h1 className="text-xl font-semibold mb-6">TrackMint</h1>

                <nav className="flex flex-col gap-2">
                    <SidebarLink
                        to="/dashboard"
                        icon="space_dashboard"
                        label="Dashboard"
                    />
                </nav>

                <button className="mt-6 w-full border rounded p-2 flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-rounded">add</span>
                    Add Expense
                </button>
            </div>

            <div className="border-t pt-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300" />
                    <div>
                        <p className="text-sm font-medium">User Name</p>
                    </div>
                </div>

                <button
                    className="flex items-center gap-2 text-sm cursor-pointer"
                    onClick={handleLogout}
                >
                    <span className="material-symbols-rounded">logout</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}

function SidebarLink({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded 
        ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
            }
        >
            <span className="material-symbols-rounded text-base">{icon}</span>
            <span>{label}</span>
        </NavLink>
    );
}
