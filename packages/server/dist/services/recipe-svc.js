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
// in src/services/recipe-svc.ts:
function create(json) {
    const t = new RecipeModel(json);
    return t.save();
}
function update(id, recipe) {
    return RecipeModel.findOneAndUpdate({ id: id }, recipe, { new: true })
        .then((updated) => {
        if (!updated)
            throw `${id} not updated`;
        else
            return updated;
    });
}
function remove(id) {
    return RecipeModel.findOneAndDelete({ id: id }).then((deleted) => {
        if (!deleted)
            throw `${id} not deleted`;
    });
}
export default { index, get, create, update, remove };
