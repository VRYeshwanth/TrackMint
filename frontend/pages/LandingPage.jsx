import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-(--app-bg) text-(--text-primary) flex flex-col items-center px-6 py-8 md:py-16">
            <header className="w-full text-center flex justify-center items-center gap-2">
                <span className="material-symbols-rounded text-(--primary) text-4xl!">
                    savings
                </span>
                <h2 className="text-xl font-semibold">TrackMint</h2>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center text-center gap-6">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Track your expenses with ease
                </h1>
                <p className="text-(--text-secondary) text-base md:text-lg max-w-xl">
                    The simplest way to handle your personal finances without
                    any clutter
                </p>
                <div className="flex flex-col items-center gap-4 mt-4">
                    <Link className="bg-(--primary) hover:bg-(--primary-hover) text-white px-6 py-3 rounded-xl font-medium transition cursor-pointer">
                        Get Started
                    </Link>
                    <Link className="text-(--text-secondary) hover:text-(--text-primary) transition" to="/register">
                        Create an account
                    </Link>
                </div>
            </main>

            <footer className="text-sm text-(--text-secondary)">
                <p>@2026 TrackMint. All Rights Reserved</p>
            </footer>
        </div>
    );
}
