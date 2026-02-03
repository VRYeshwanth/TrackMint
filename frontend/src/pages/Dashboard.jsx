export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-(--text-primary)">
                    Dashboard
                </h1>
                <h3 className="mt-1 text-(--text-secondary)">
                    Welcome back! Here's your spending overview.
                </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="bg-(--card-bg) border border-(--border-default) rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-(--text-secondary)">
                        Total Expenses
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-(--text-primary)">
                        ₹50,000
                    </h2>
                </div>
                <div className="bg-(--card-bg) border border-(--border-default) rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-(--text-secondary)">
                        Highest Expense
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-(--text-primary)">
                        ₹8,999
                    </h2>
                </div>
            </div>
        </div>
    );
}
