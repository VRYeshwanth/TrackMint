import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Avatar from "./Avatar.jsx";

export default function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <aside
            className={` fixed md:static top-0 left-0 z-40 w-64 h-screen flex flex-col justify-between px-5 py-6 bg-(--card-bg) border-r border-(--border-default) text-(--text-primary) transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
    `}
        >
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-rounded text-(--primary) text-4xl! leading-none">
                        savings
                    </span>
                    <h1 className="text-2xl font-semibold tracking-tight leading-none">
                        TrackMint
                    </h1>
                </div>

                <nav className="flex flex-col gap-1">
                    <SidebarLink
                        to="/dashboard"
                        icon="space_dashboard"
                        label="Dashboard"
                        setIsOpen={setIsOpen}
                    />
                </nav>

                <button className="mt-8 w-full flex items-center justify-center gap-2 bg-(--primary) hover:bg-(--primary-hover) text-white font-medium rounded-lg h-11 transition-colors duration-200 cursor-pointer">
                    <span className="material-symbols-rounded text-[20px]">
                        add
                    </span>
                    Add Expense
                </button>
            </div>

            <div className="border-t border-(--border-default) pt-5">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar name={user?.username} />
                    <div>
                        <p className="text-sm font-medium">{user?.username}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg text-(--text-secondary)  hover:text-red-600 hover:bg-red-500/10  dark:hover:bg-red-500/20 transition-colors duration-200 cursor-pointer"
                    >
                        <span className="material-symbols-rounded text-[20px]">
                            logout
                        </span>
                        Logout
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-rounded text-[20px]">
                            {theme === "dark" ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

function SidebarLink({ to, icon, label, setIsOpen }) {
    return (
        <NavLink
            to={to}
            end={to === "/"}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium
                 transition-all duration-200
                 ${
                     isActive
                         ? "bg-(--primary)/10 text-(--primary)"
                         : "text-(--text-secondary) hover:bg-black/5 dark:hover:bg-white/5 hover:text-(--text-primary)"
                 }`
            }
        >
            <span className="material-symbols-rounded text-[20px]">{icon}</span>
            {label}
        </NavLink>
    );
}
