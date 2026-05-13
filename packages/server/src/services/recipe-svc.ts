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

// in src/services/recipe-svc.ts:
function create(json: Recipe): Promise<Recipe> {
  const t = new RecipeModel(json);
  return t.save();
}

function update(
  id: string,
  recipe: Recipe
): Promise<Recipe | undefined> {
  return RecipeModel.findOneAndUpdate(
    { id: id },
    recipe,
    { new: true })
  .then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated as unknown as Recipe;
  });
}

function remove(id: string): Promise<void> {
  return RecipeModel.findOneAndDelete({ id: id }).then(
    (deleted) => {
      if (!deleted) throw `${id} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
