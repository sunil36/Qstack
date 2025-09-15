import express from "express";
import { login } from "../controllers/authController.js";
const router = express.Router();

// Login page route
router.get("/login", (req, res) => {
    res.render("admin/layouts/auth/login", { title: "Login Page" });
});

router.post("/login", login)
// admin routes
router.get("/admin", (req, res) => {
    res.render("admin/layouts/dashboard/index", { title: "dashboard page" });
});

router.get("/user-list", (req, res) => {
    res.render("admin/layouts/users/list", { title: "User List" })
})
router.get("/add-user", (req, res) => {
    res.render("admin/layouts/users/create", { title: "Add user" })
})
export default router;

