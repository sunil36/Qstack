import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;


// Serve everything in /public at the site root
app.use(express.static(path.join(__dirname, "../public")));


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});