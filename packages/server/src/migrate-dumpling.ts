import { connect } from "./services/mongo.ts";
import RecipeSvc from "./services/recipe-svc.ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

connect("recipes");

setTimeout(async () => {
  const recipes = await RecipeSvc.index();
  const dumpling = recipes.find((r) => r.title.toLowerCase().includes("dumpling"));
  if (!dumpling) { console.log("Not found. Titles:", recipes.map(r => r.title)); process.exit(1); }
  await RecipeSvc.update(dumpling.id, {
    ...dumpling,
    icon: "/images/dumpling-bake.jpeg",
    ingredients: [
      "1/4 cup Trader Joe's Soyaki",
      "3/4 bottle Trader Joe's Thai-Style Red Curry Sauce (prepared simmer sauce, not curry paste)",
      "1 cup coconut milk (unsweetened)",
      "1 tablespoon minced garlic",
      "1/2 cup water",
      "20 frozen potstickers of your choice (chicken, beef, or veggie)",
      "Fresh cilantro, chopped (garnish)",
      "Green onions, thinly sliced (garnish)",
      "1 spoonful Crunchy Chili Onion or chili crisp (garnish)",
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Whisk together Soyaki, Thai-style red curry sauce, coconut milk, minced garlic, and water until smooth.",
      "Arrange frozen potstickers in a baking dish (8x8 or 9x13). Pour sauce evenly over the dumplings.",
      "Cover tightly with foil and bake for 30-40 minutes, until bubbly and hot.",
      "Top with chopped cilantro, sliced green onions, and a spoonful of Crunchy Chili Onion before serving.",
    ],
  });
  console.log("Done!");
  process.exit(0);
}, 2000);
