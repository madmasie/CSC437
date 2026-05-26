import { Auth } from "@unbndl/auth";
// Auth.Model is the type expected by Store.Provider's update function
import { Recipe } from "server/models";
import { Model } from "./model.ts";
import { Msg, MsgCallbacks } from "./messages.ts";

export type Cmd =
  | ["recipe/load", { recipe: Recipe }]
  | ["recipes/load", { recipes: Recipe[] }]
  | ["recipes/invalidate", {}];

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
    case "recipes/invalidate":
      // Drop cached list so the next request refetches.
      return { ...model, recipes: undefined };
    case "recipe/save": {
      const { id, recipe, onSuccess, onFailure } = payload;
      return [
        model,
        saveRecipe(id, recipe, user, { onSuccess, onFailure })
      ];
    }
    case "recipe/create": {
      const { recipe, onSuccess, onFailure } = payload;
      return [
        model,
        createRecipe(recipe, user, { onSuccess, onFailure })
      ];
    }
    case "recipe/delete": {
      const { id, onSuccess, onFailure } = payload;
      return [
        model,
        deleteRecipe(id, user, { onSuccess, onFailure })
      ];
    }
    default: {
      const unhandled: never = type as never;
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
  return model;
}

function fetchRecipe(id: string, user: Auth.Model): Promise<Cmd> {
  return fetch(`/api/recipes/${id}`, { headers: Auth.headers(user) })
    .then((r) => {
      if (r.status === 200) return r.json();
      throw new Error(`HTTP ${r.status}`);
    })
    .then((recipe: Recipe) => ["recipe/load", { recipe }] as Cmd);
}

function fetchRecipes(user: Auth.Model): Promise<Cmd> {
  return fetch("/api/recipes", { headers: Auth.headers(user) })
    .then((r) => {
      if (r.status === 200) return r.json();
      throw new Error(`HTTP ${r.status}`);
    })
    .then((recipes: Recipe[]) => ["recipes/load", { recipes }] as Cmd);
}

function saveRecipe(
  id: string,
  recipe: Recipe,
  user: Auth.Model,
  callbacks: MsgCallbacks
): Promise<Cmd> {
  return fetch(`/api/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...Auth.headers(user) },
    body: JSON.stringify(recipe),
  })
    .then((r) => {
      if (r.status === 200) return r.json();
      throw new Error(`Failed to save recipe ${id} (HTTP ${r.status})`);
    })
    .then((updated: Recipe) => {
      callbacks.onSuccess?.();
      return ["recipe/load", { recipe: updated }] as Cmd;
    })
    .catch((err: Error) => {
      callbacks.onFailure?.(err);
      throw err;
    });
}

function createRecipe(
  recipe: Recipe,
  user: Auth.Model,
  callbacks: MsgCallbacks
): Promise<Cmd> {
  return fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...Auth.headers(user) },
    body: JSON.stringify(recipe),
  })
    .then((r) => {
      if (r.status === 201) return r.json();
      throw new Error(`Failed to create recipe (HTTP ${r.status})`);
    })
    .then((_created: Recipe) => {
      callbacks.onSuccess?.();
      return ["recipes/invalidate", {}] as Cmd;
    })
    .catch((err: Error) => {
      callbacks.onFailure?.(err);
      throw err;
    });
}

function deleteRecipe(
  id: string,
  user: Auth.Model,
  callbacks: MsgCallbacks
): Promise<Cmd> {
  return fetch(`/api/recipes/${id}`, {
    method: "DELETE",
    headers: Auth.headers(user),
  })
    .then((r) => {
      if (r.status !== 204) {
        throw new Error(`Failed to delete recipe ${id} (HTTP ${r.status})`);
      }
      callbacks.onSuccess?.();
      return ["recipes/invalidate", {}] as Cmd;
    })
    .catch((err: Error) => {
      callbacks.onFailure?.(err);
      throw err;
    });
}
