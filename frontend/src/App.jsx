import { HashRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";

import LandingPage from "../pages/LandingPage.jsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LandingPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
