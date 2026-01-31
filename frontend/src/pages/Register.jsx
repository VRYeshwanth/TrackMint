import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import { useLoader } from "../context/LoaderContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            showLoader();

            const res = await axiosInstance.post("/api/auth/register", {
                username: form.name,
                email: form.email,
                password: form.password,
            });

            showToast("success", "Registration Success !!", res.data.message);

            navigate("/login");
        } catch (err) {
            showToast(
                "error",
                "Registration Failed !!",
                err.response?.data?.error,
            );
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="flex flex-col items-center text-(--text-primary) py-4">
            <header className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center">
                    <span className="material-symbols-rounded text-(--primary) text-4xl! leading-none">
                        savings
                    </span>
                </div>
                <h2 className="text-xl font-semibold">TrackMint</h2>
            </header>

            <main className="w-full max-w-md mt-6 bg-(--card-bg) rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Create account</h1>
                    <p className="text-sm text-(--text-secondary) mt-1">
                        Join us to start managing your expenses
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <div className="flex items-center gap-2 rounded-lg px-3 h-11 bg-(--input-default) border border-(--border-default)">
                            <span className="material-symbols-rounded text-(--text-secondary) text-xl!">
                                person
                            </span>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="name@company.com"
                                value={form.email}
                                onChange={handleChange}
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
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-11 mt-2 bg-(--primary) hover:bg-(--primary-hover) text-white rounded-lg font-medium transition cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>
            </main>

            <p className="mt-6 text-sm text-(--text-secondary)">
                Already have an account?
                <Link to="/login" className="text-(--primary) font-medium ml-1">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
