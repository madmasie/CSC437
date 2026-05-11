import express from "express";
import { connect } from "./services/mongo.js";
import recipes from "./routes/recipes.js";
connect("recipes");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));
app.use(express.json());
app.get("/hello", (_, res) => {
    res.send("Hello, World");
});
app.use("/api/recipes", recipes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//http://localhost:3000/api/recipes
//http://localhost:3000/api/recipes/focaccia-bread
