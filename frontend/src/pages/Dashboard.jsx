import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import { useLoader } from "../context/LoaderContext.jsx";
export default function Dashboard() {
    const [totalExpense, setTotalExpense] = useState();
    const [highestExpense, setHighestExpense] = useState(null);

    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                showLoader();

                const [totalResult, highestResult] = await Promise.all([
                    axiosInstance.get("/api/stats/total"),
                    axiosInstance.get("/api/stats/highest"),
                ]);

                const totalData = totalResult.data;
                const highestData = highestResult.data;

                setTotalExpense(totalData.total);
                setHighestExpense(highestData[0]);
            } catch (err) {
                console.log(err);
            } finally {
                hideLoader();
            }
        };

        fetchStatistics();
    }, []);

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
                        ₹{totalExpense?.toLocaleString()}
                    </h2>
                </div>
                <div className="bg-(--card-bg) border border-(--border-default) rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-(--text-secondary)">
                        Highest Expense
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-(--text-primary)">
                        ₹{highestExpense?.amount?.toLocaleString()}
                    </h2>
                </div>
            </div>
        </div>
    );
}
