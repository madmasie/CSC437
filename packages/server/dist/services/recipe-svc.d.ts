import { Recipe } from "../models/index.ts";
declare function index(): Promise<Recipe[]>;
declare function get(id: string): Promise<Recipe | undefined>;
declare function create(json: Recipe): Promise<Recipe>;
declare function update(id: string, recipe: Recipe): Promise<Recipe | undefined>;
declare function remove(id: string): Promise<void>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export default _default;
