import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("🚀 Starting server...");

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/stats", statisticsRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");

        app.listen(PORT, () => {
            console.log(`✅ Server running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });
