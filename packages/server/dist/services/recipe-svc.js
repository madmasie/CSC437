import { Schema, model } from "mongoose";
const recipeSchema = new Schema({
    id: String,
    href: String,
    icon: String,
    title: String,
    description: String,
    difficulty: String,
    time: String,
}, { collection: "recipes" });
const RecipeModel = model("Recipe", recipeSchema);
function index() {
    return RecipeModel.find();
}
function get(id) {
    return RecipeModel.find({ id })
        .then((list) => list[0])
        .catch(() => { throw `${id} Not Found`; });
}
export default { index, get };
