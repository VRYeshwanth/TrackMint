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

export const getSingleExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findById(id);

        if (!expense)
            return res.status(404).json({ error: "Expense not found !!" });

        if (expense.userId.toString() !== req.user.id)
            return res.status(403).json({ error: "Access Denied !!" });

        return res.status(200).json(expense);
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

export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, description, date } = req.body;

        const existingExpense = await Expense.findById(id);

        if (!existingExpense)
            return res.status(404).json({ error: "Expense not found !!" });

        if (existingExpense.userId.toString() !== req.user.id)
            return res.status(403).json({ error: "Access Denied !!" });

        if (title !== undefined) existingExpense.title = title;
        if (amount !== undefined) existingExpense.amount = amount;
        if (category !== undefined) existingExpense.category = category;
        if (date !== undefined) existingExpense.date = date;
        if (description !== undefined)
            existingExpense.description = description;

        await existingExpense.save();

        res.status(200).json(existingExpense);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const existingExpense = await Expense.findById(id);

        if (!existingExpense)
            return res.status(404).json({ error: "Expense not found !!" });

        if (existingExpense.userId.toString() !== req.user.id)
            return res.status(403).json({ error: "Access Denied !!" });

        await Expense.deleteOne({ _id: id });
        return res
            .status(200)
            .json({ message: "Expense deleted successfully !!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
