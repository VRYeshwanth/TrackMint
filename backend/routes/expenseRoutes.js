import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    getAllExpenses,
    createExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", verifyToken, getAllExpenses);
router.post("/add", verifyToken, createExpense);

export default router;
