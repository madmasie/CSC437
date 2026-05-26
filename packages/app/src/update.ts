import { Auth } from "@unbndl/auth";
// Auth.Model is the type expected by Store.Provider's update function
import { Recipe } from "server/models";
import { Model } from "./model.ts";
import { Msg } from "./messages.ts";

export type Cmd =
  | ["recipe/load", { recipe: Recipe }]
  | ["recipes/load", { recipes: Recipe[] }];

export default function update(
  model: Readonly<Model>,
  message: Msg | Cmd,
  user: Auth.Model
): Model | [Model, Promise<Cmd>] {
  // Reset cached user-specific data when the authenticated user changes
  // (sign-in, sign-out, or switching accounts).
  if (model.username !== user.username) {
    model = { username: user.username };
  }

  const [type, payload] = message as [string, any];
  switch (type) {
    case "recipe/request":
      if (model.recipe?.id === payload.id) break;
      if (!user.token) break;
      return [
        { ...model, recipe: undefined },
        fetchRecipe(payload.id, user)
      ];
    case "recipe/load":
      return { ...model, recipe: payload.recipe };
    case "recipes/request":
      if (model.recipes) break;
      if (!user.token) break;
      return [
        { ...model, recipes: [] },
        fetchRecipes(user)
      ];
    case "recipes/load":
      return { ...model, recipes: payload.recipes };
    default:
      throw new Error(`Unhandled message "${type}"`);
  }
  return model;
}

function fetchRecipe(id: string, user: Auth.Model): Promise<Cmd> {
  return fetch(`/api/recipes/${id}`, { headers: Auth.headers(user) })
    .then((r) => {
      if (r.status === 200) return r.json();
      throw `HTTP ${r.status}`;
    })
    .then((recipe: Recipe) => ["recipe/load", { recipe }] as Cmd);
}

function fetchRecipes(user: Auth.Model): Promise<Cmd> {
  return fetch("/api/recipes", { headers: Auth.headers(user) })
    .then((r) => {
      if (r.status === 200) return r.json();
      throw `HTTP ${r.status}`;
    })
    .then((recipes: Recipe[]) => ["recipes/load", { recipes }] as Cmd);
}
