const express = require("express");
const router = express.Router();

// Login page route
router.get("/", (req, res) => {
    res.render("admin/layouts/auth/login", { title: "Login Page" });
});

module.exports = router;