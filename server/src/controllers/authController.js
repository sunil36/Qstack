import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AdminUser.findOne({ email: username });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );
        // 4. Update last login
        user.last_login_at = new Date();
        user.last_login_ip = req.ip;
        await user.save();
        console.log(user._id, 'xa');
        res.json({
            status: "success",
            message: "Login sucessufully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
            },

            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
