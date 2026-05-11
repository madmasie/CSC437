import { Schema, model } from "mongoose";
import { Recipe } from "../models/index.ts";

const recipeSchema = new Schema<Recipe>(
  {
    id: String,
    href: String,
    icon: String,
    title: String,
    description: String,
    difficulty: String,
    time: String,
  },
  { collection: "recipes" }
);

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

function index(): Promise<Recipe[]> {
  return RecipeModel.find();
}

function get(id: string): Promise<Recipe | undefined> {
  return RecipeModel.find({ id })
    .then((list) => list[0])
    .catch(() => { throw `${id} Not Found`; });
}

export default { index, get };
