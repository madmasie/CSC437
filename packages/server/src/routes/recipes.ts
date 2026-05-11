import express, { Request, Response } from "express";
import { Recipe } from "../models/index.ts";
import Recipes from "../services/recipe-svc.ts";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Recipes.index()
    .then((list: Recipe[]) => res.send(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Recipes.get(id)
    .then((recipe: Recipe | undefined) => {
      if (!recipe) res.status(404).send();
      else res.send(recipe);
    })
    .catch((err) => res.status(404).send(err));
});

export default router;
