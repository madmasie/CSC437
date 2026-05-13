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
  const id = req.params.id as string;
  Recipes.get(id)
    .then((recipe: Recipe | undefined) => {
      if (!recipe) res.status(404).send();
      else res.send(recipe);
    })
    .catch((err) => res.status(404).send(err));
});

// in src/routes/recipes.ts
router.post("/", (req: Request, res: Response) => {
  const newRecipe = req.body;

  Recipes.create(newRecipe)
    .then((recipe: Recipe) =>
      res.status(201).json(recipe)
    )
    .catch((err) => res.status(500).send(err));
});

// in src/routes/recipes.ts, after our previous routes
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const newRecipe = req.body;

  Recipes.update(id, newRecipe)
    .then((recipe: Recipe | undefined) => res.json(recipe))
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;

  Recipes.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
