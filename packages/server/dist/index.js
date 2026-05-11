import express from "express";
import Recipes from "./services/recipe-svc.js";
// in src/index.ts
// add this import near the top
import { connect } from "./services/mongo.js";
connect("recipes"); // use your own db name here
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));
app.use(express.json());
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
app.get("/api/recipes/:id", (req, res) => {
    const id = req.params.id;
    const data = Recipes.get(id);
    if (data)
        res.send(data);
    else
        res.status(404).send();
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
