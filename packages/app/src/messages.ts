import { Recipe } from "server/models";

export interface MsgCallbacks {
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

export type Msg =
  | ["recipe/request", { id: string }]
  | ["recipes/request", {}]
  | ["recipe/load", { recipe: Recipe }]
  | ["recipes/load", { recipes: Recipe[] }]
  | ["recipe/save", { id: string; recipe: Recipe } & MsgCallbacks]
  | ["recipe/create", { recipe: Recipe } & MsgCallbacks]
  | ["recipe/delete", { id: string } & MsgCallbacks];
