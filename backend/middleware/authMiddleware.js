import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.status(404).json({ error: "Access Denied !!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token !!" });
    }
};
