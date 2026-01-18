import { HashRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";

import LandingPage from "../pages/LandingPage.jsx";
import Register from "../pages/Register.jsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}
