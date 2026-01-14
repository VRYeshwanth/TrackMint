import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    getAllExpenses,
    getSingleExpense,
    createExpense,
    updateExpense,
    deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", verifyToken, getAllExpenses);
router.get("/:id", verifyToken, getSingleExpense);
router.post("/add", verifyToken, createExpense);
router.patch("/update/:id", verifyToken, updateExpense);
router.delete("/delete/:id", verifyToken, deleteExpense);

export default router;
