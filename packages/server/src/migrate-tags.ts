import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { connect } from "./services/mongo.ts";
import RecipeSvc from "./services/recipe-svc.ts";

const TAGS: Record<string, string[]> = {
  "focaccia-bread":         ["Dinner", "Savory", "Medium"],
  "key-lime-loaf":          ["Dessert", "Sweet", "Easy"],
  "maddies-garlic-parm-pasta": ["Dinner", "Savory", "Creamy", "Easy"],
  "focaccia-dip":           ["Savory", "Easy"],
  "costco-matcha":          ["Sweet", "Easy"],
  "homemade-pasta":         ["Dinner", "Savory", "Medium"],
  "parmesan-crisps":        ["Savory", "Easy"],
  "maddies-dumpling-bake":  ["Dinner", "Savory", "Spicy", "Easy"],
  "homemade-tomato-soup":   ["Dinner", "Savory", "Creamy", "Easy"],
  "maddies-pizza":          ["Dinner", "Savory", "Medium"],
};

connect("recipes");

setTimeout(async () => {
  const recipes = await RecipeSvc.index();
  for (const recipe of recipes) {
    const tags = TAGS[recipe.id];
    if (!tags) continue;
    const plain = JSON.parse(JSON.stringify(recipe));
    await RecipeSvc.update(recipe.id, { ...plain, tags });
    console.log(`Updated ${recipe.id}`);
  }
  console.log("Done!");
  process.exit(0);
}, 2000);
