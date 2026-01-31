import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext.jsx";

import AuthLayout from "./layouts/AuthLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
    const { isAuth } = useAuth();

    return (
        <HashRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={
                            isAuth ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                </Route>

                <Route
                    element={
                        isAuth ? (
                            <AppLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
