import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String }
    },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: {
        type: String,
        enum: ["super_admin", "partner", "subordinate", "business"],
        default: "partner"
    },
    permissions: [{ type: String }],
    status: {
        type: String,
        enum: ["active", "suspended", "deleted"],
        default: "active"
    },
    last_login_at: { type: Date },
    last_login_ip: { type: String },
}, { timestamps: true });

export default mongoose.model("AdminUser", adminUserSchema);
