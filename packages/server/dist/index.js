import express from "express";
import fs from "node:fs/promises";
import path from "path";
import { connect } from "./services/mongo.js";
import recipes from "./routes/recipes.js";
import auth, { authenticateUser } from "./routes/auth.js";
connect("recipes");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.json());
app.use("/auth", auth);
app.use(express.static(staticDir));
app.get("/hello", (_, res) => {
    res.send("Hello, World");
});
app.use("/api/recipes", authenticateUser, recipes);
// SPA Routes: /app/...
app.use("/app", (req, res) => {
    const indexHtml = path.resolve(staticDir, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//http://localhost:3000/api/recipes
//http://localhost:3000/api/recipes/focaccia-bread
