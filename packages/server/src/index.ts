import express, { Request, Response } from "express";
import { connect } from "./services/mongo.ts";
import recipes from "./routes/recipes.ts";
// in src/index.ts
// near the top, with the other imports
import auth from "./routes/auth.ts";
import { authenticateUser } from "./routes/auth.ts";


connect("recipes");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.json());

// further down, near where you use the profiles router
app.use("/auth", auth);
app.use(express.static(staticDir));

app.get("/hello", (_: Request, res: Response) => {
  res.send("Hello, World");
});
app.use("/api/recipes", authenticateUser, recipes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//http://localhost:3000/api/recipes
//http://localhost:3000/api/recipes/focaccia-bread
