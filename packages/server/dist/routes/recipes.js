import express from "express";
import Recipes from "../services/recipe-svc.js";
const router = express.Router();
router.get("/", (_, res) => {
    Recipes.index()
        .then((list) => res.send(list))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Recipes.get(id)
        .then((recipe) => {
        if (!recipe)
            res.status(404).send();
        else
            res.send(recipe);
    })
        .catch((err) => res.status(404).send(err));
});
// in src/routes/recipes.ts
router.post("/", (req, res) => {
    const newRecipe = req.body;
    Recipes.create(newRecipe)
        .then((recipe) => res.status(201).json(recipe))
        .catch((err) => res.status(500).send(err));
});
// in src/routes/recipes.ts, after our previous routes
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const newRecipe = req.body;
    Recipes.update(id, newRecipe)
        .then((recipe) => res.json(recipe))
        .catch((err) => res.status(404).end());
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Recipes.remove(id)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});
export default router;
