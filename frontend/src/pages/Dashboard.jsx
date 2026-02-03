import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import { useLoader } from "../context/LoaderContext.jsx";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function Dashboard() {
    const [totalExpense, setTotalExpense] = useState();
    const [highestExpense, setHighestExpense] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);

    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                showLoader();

                const [totalResult, highestResult, monthlyResult] =
                    await Promise.all([
                        axiosInstance.get("/api/stats/total"),
                        axiosInstance.get("/api/stats/highest"),
                        axiosInstance.get("/api/stats/monthly"),
                    ]);

                const totalData = totalResult.data;
                const highestData = highestResult.data;

                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];

                const formattedMonthly = monthlyResult.data.map((item) => ({
                    month: `${monthNames[item._id.month - 1]} '${String(item._id.year).slice(-2)}`,
                    total: item.total,
                }));

                setMonthlyData(formattedMonthly);

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-(--card-bg) border border-(--border-default) rounded-2xl p-6">
                    <h3 className="text-(--text-primary) font-medium mb-4">
                        Monthly Spending
                    </h3>
                    <div className="h-50 sm:h-65">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={monthlyData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="var(--border-default)"
                                />
                                <XAxis
                                    dataKey="month"
                                    stroke="var(--text-secondary)"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="var(--text-secondary)"
                                    tick={{ fontSize: 12 }}
                                    width={50}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--card-bg)",
                                        border: "1px solid var(--border-default)",
                                        borderRadius: "12px",
                                        color: "var(--text-primary)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="var(--primary)"
                                    strokeWidth={2.5}
                                    dot={{ r: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-(--card-bg) border border-(--border-default) rounded-2xl p-6">
                    <h3 className="text-(--text-primary) font-medium mb-4">
                        Spending by Category
                    </h3>
                    {/* Pie chart later */}
                </div>
            </div>
        </div>
    );
}
