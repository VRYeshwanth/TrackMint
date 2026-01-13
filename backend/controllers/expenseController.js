import Expense from "../models/Expense.js";

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });
        return res.status(200).json(expenses);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const createExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;

        if (!title || !amount || !category)
            return res
                .status(400)
                .json({ error: "Please fill all the required fields !!" });

        if (isNaN(amount) || amount <= 0)
            return res
                .status(400)
                .json({ error: "Amount must be a positive number !!" });

        const newExpense = await Expense.create({
            userId: req.user.id,
            title: title,
            amount: amount,
            category: category,
            date: date ? new Date(date) : new Date(),
            description: description || "",
        });

        return res.status(201).json({
            message: "Expense successfully created !!",
            expense: newExpense,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
