import express from "express";
import {
    getTotalSpendings,
    categoryWiseSpendings,
    monthlySpendings,
    highestExpense,
} from "../controllers/statisticsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/total", verifyToken, getTotalSpendings);
router.get("/category-breakdown", verifyToken, categoryWiseSpendings);
router.get("/monthly", verifyToken, monthlySpendings);
router.get("/highest", verifyToken, highestExpense);

export default router;
