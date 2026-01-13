import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res
                .status(400)
                .json({ error: "Please fill all the fields !!" });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ error: "User already registered !!" });

        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User successfully registered !!",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res
                .status(400)
                .json({ error: "Please fill all the details !!" });

        const existingUser = await User.findOne({ email: email });

        if (!existingUser)
            return res.status(400).json({ error: "Invalid Credentials !!" });

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch)
            return res.status(400).json({ error: "Invalid Credentials !!" });

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "User successfully logged in !!",
            token: token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
