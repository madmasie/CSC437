import { connect } from "./services/mongo.ts";
import RecipeSvc from "./services/recipe-svc.ts";

connect("recipes");

// Give mongoose a moment to connect
setTimeout(async () => {
  const recipes = await RecipeSvc.index();
  const dumpling = recipes.find((r) =>
    r.title.toLowerCase().includes("dumpling")
  );
  if (!dumpling) {
    console.log("No dumpling recipe found. Titles:", recipes.map((r) => r.title));
    process.exit(1);
  }
  console.log("Found:", dumpling.title, "id:", dumpling.id);
  await RecipeSvc.update(dumpling.id, { ...dumpling, icon: "/images/dumpling-bake.jpeg" });
  console.log("Updated icon to /images/dumpling-bake.jpeg");
  process.exit(0);
}, 2000);
