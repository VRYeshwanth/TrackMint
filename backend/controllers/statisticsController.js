import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const getTotalSpendings = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(req.user.id) },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        return res.status(200).json(result[0] || { total: 0 });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const categoryWiseSpendings = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: { total: -1 },
            },
        ]);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const monthlySpendings = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const highestExpense = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(req.user.id) },
            },
            {
                $sort: { amount: -1 },
            },
            {
                $limit: 1,
            },
        ]);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
