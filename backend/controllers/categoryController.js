import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id }).sort({
            name: 1,
        });

        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "")
            return res.status(400).json({ error: "Provide category name !!" });

        const existingCategory = await Category.findOne({
            name: name.trim(),
            userId: req.user.id,
        });

        if (existingCategory)
            return res
                .status(400)
                .json({ error: "Category already exists !!" });

        const category = await Category.create({
            name: name.trim(),
            userId: req.user.id,
        });

        return res.status(201).json({
            message: "Category created !!",
            category: { name: category.name },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCategory = await Category.findOne({
            _id: id,
            userId: req.user.id,
        });

        if (!existingCategory)
            return res.status(404).json({ error: "Category not found !!" });

        await Category.deleteOne({ _id: id });

        return res.status(200).json({ message: "Category deleted !!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
