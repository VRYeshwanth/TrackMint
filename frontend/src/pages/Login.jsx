import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import { useLoader } from "../context/LoaderContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            showLoader();

            const response = await axiosInstance.post("/api/auth/login", {
                email: form.email,
                password: form.password,
            });

            showToast("success", "Login Success", response.data.message);

            login(response.data.token);

            navigate("/dashboard");
        } catch (err) {
            showToast("error", "Login Failed", err.response?.data?.error);
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="flex flex-col items-center text-(--text-primary) py-4">
            <header className="flex flex-col items-center gap-2">
                <span className="material-symbols-rounded text-(--primary) text-4xl!">
                    savings
                </span>
                <h2 className="text-xl font-semibold">TrackMint</h2>
            </header>

            <main className="w-full max-w-md mt-6 bg-(--card-bg) rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Sign in</h1>
                    <p className="text-sm text-(--text-secondary) mt-1">
                        Welcome back! Please enter your details
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <div className="flex items-center gap-2 rounded-lg px-3 h-11 bg-(--input-default) border border-(--border-default)">
                            <span className="material-symbols-rounded text-(--text-secondary) text-xl!">
                                mail
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full bg-transparent outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <div className="flex items-center gap-2 bg-(--input-default) rounded-lg px-3 h-11 border border-(--border-default)">
                            <span className="material-symbols-rounded text-(--text-secondary) text-xl!">
                                lock
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full bg-transparent outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-11 mt-2 bg-(--primary) hover:bg-(--primary-hover) text-white rounded-lg font-medium transition"
                    >
                        Sign In
                    </button>
                </form>
            </main>

            <p className="mt-6 text-sm text-(--text-secondary)">
                Don’t have an account?
                <Link
                    to="/register"
                    className="text-(--primary) font-medium ml-1"
                >
                    Create one
                </Link>
            </p>
        </div>
    );
}
