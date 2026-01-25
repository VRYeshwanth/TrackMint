import { Link } from "react-router-dom";

export default function Register() {
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <div className="flex items-center gap-2 rounded-lg px-3 h-11 bg-(--input-default) border border-(--border-default)">
              <span className="material-symbols-rounded text-(--text-secondary) text-xl!">
                person
              </span>
              <input
                type="text"
                placeholder="John Doe"
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
                placeholder="name@company.com"
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center gap-2 bg-(--input-default) rounded-lg px-3 h-11 border border-(--border-default)">
              <span className="material-symbols-rounded text-(--text-secondary) text-xl!">
                lock
              </span>
              <input
                type="password"
                placeholder="Create a password"
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
