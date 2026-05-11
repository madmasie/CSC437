import express from "express";
import Recipes from "../services/recipe-svc.js";
const router = express.Router();
router.get("/", (_, res) => {
    Recipes.index()
        .then((list) => res.send(list))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Recipes.get(id)
        .then((recipe) => {
        if (!recipe)
            res.status(404).send();
        else
            res.send(recipe);
    })
        .catch((err) => res.status(404).send(err));
});
export default router;
