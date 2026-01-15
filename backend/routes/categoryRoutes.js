import express from "express";
import {
    getAllCategories,
    createCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCategories);
router.post("/add", verifyToken, createCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);

export default router;
