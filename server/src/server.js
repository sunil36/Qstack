import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import seedSuperAdmin from "./config/superadmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
// Set views directory & template engine
app.set("views", path.join(__dirname, "../../public/views"));
app.set("view engine", "ejs");
// Serve static files
app.use(express.static(path.join(__dirname, "../../public")));
// Use routes
app.use("/", authRoutes);
connectDB().then(async () => {
    await seedSuperAdmin(); // insert default superadmin if missing
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});