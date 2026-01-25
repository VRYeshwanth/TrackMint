import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-(--app-bg) flex justify-center items-center px-4">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <Outlet />
            </div>
        </div>
    );
}
