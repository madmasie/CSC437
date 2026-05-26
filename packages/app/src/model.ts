import { Recipe } from "server/models";

export interface Model {
  username?: string;
  recipes?: Recipe[];
  recipe?: Recipe;
}

export const init: Model = {};
