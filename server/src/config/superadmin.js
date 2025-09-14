import bcrypt from "bcrypt";
import AdminUser from "../models/AdminUser.js";

const seedSuperAdmin = async () => {
    try {
        const existing = await AdminUser.findOne({ role: "super_admin" });

        if (!existing) {
            const hash = await bcrypt.hash("Admin@12346789", 10);

            await AdminUser.create({
                name: { first: "Super", last: "Admin" },
                email: "superadmin@example.com",
                password_hash: hash,
                role: "super_admin",
                permissions: ["*"],   // full access
                status: "active"
            });

            console.log("Default superadmin created");
        } else {
            console.log("Superadmin already exists");
        }
    } catch (err) {
        console.error(" Error seeding superadmin:", err.message);
    }
};

export default seedSuperAdmin;
