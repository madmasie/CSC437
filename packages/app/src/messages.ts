import { Recipe } from "server/models";

export type Msg =
  | ["recipe/request", { id: string }]
  | ["recipes/request"]
  | ["recipe/load", { recipe: Recipe }]
  | ["recipes/load", { recipes: Recipe[] }];
