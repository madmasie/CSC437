import { Recipe } from "../models/index.ts";
declare function index(): Promise<Recipe[]>;
declare function get(id: string): Promise<Recipe | undefined>;
declare const _default: {
    index: typeof index;
    get: typeof get;
};
export default _default;
