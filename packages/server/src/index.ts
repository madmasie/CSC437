import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { connect } from "./services/mongo.ts";
import recipes from "./routes/recipes.ts";
import auth, { authenticateUser } from "./routes/auth.ts";

connect("recipes");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.json());

app.use("/auth", auth);
app.use(express.static(staticDir));

app.get("/", (_: Request, res: Response) => {
  res.redirect("/app");
});

app.get("/hello", (_: Request, res: Response) => {
  res.send("Hello, World");
});
app.use("/api/recipes", authenticateUser, recipes);

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

app.get("/login.html", (req: Request, res: Response) => {
  res.sendFile(path.resolve(staticDir, "login.html"));
});

app.get("/sign-up.html", (req: Request, res: Response) => {
  res.sendFile(path.resolve(staticDir, "sign-up.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//http://localhost:3000/api/recipes
//http://localhost:3000/api/recipes/focaccia-bread
