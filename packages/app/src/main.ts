import { define, html } from "@unbndl/html";
import { Auth } from "@unbndl/auth";
import { Store } from "@unbndl/store";
import { BrowserHistory, Switch } from "@unbndl/switch";
import { HeaderElement } from "./components/app-header.ts";
import { RecipeCardElement } from "./components/recipe-card.ts";
import { RecipeListElement } from "./components/recipe-list.ts";
import { HomeViewElement } from "./views/home-view.ts";
import { AboutViewElement } from "./views/about-view.ts";
import { RecipeViewElement } from "./views/recipe-view.ts";
import { RecipesViewElement } from "./views/recipes-view.ts";
import { IngredientsViewElement } from "./views/ingredients-view.ts";
import { BarcodeViewElement } from "./views/barcode-view.ts";
import { SavedViewElement } from "./views/saved-view.ts";
import { HistoryViewElement } from "./views/history-view.ts";
import { EditRecipeViewElement } from "./views/edit-recipe-view.ts";
import { NewRecipeViewElement } from "./views/new-recipe-view.ts";
import { RecipeFormElement } from "./components/recipe-form.ts";
import { Model, init } from "./model.ts";
import { Msg } from "./messages.ts";
import update, { Cmd } from "./update.ts";

const routes = [
  { path: "/app/recipe/new", view: html`<new-recipe-view></new-recipe-view>` },
  {
    path: "/app/recipe/:id/edit",
    view: html`<edit-recipe-view recipe-id=${($: any) => $.params.id}></edit-recipe-view>`,
  },
  {
    path: "/app/recipe/:id",
    view: html`<recipe-view recipe-id=${($: any) => $.params.id}></recipe-view>`,
  },
  { path: "/app/recipes", view: html`<recipes-view></recipes-view>` },
  {
    path: "/app/ingredients",
    view: html`<ingredients-view></ingredients-view>`,
  },
  { path: "/app/barcode", view: html`<barcode-view></barcode-view>` },
  { path: "/app/saved", view: html`<saved-view></saved-view>` },
  { path: "/app/history", view: html`<history-view></history-view>` },
  { path: "/app/about", view: html`<about-view></about-view>` },
  { path: "/app", view: html`<home-view></home-view>` },
  { path: "/", redirect: "/app" },
];

define({
  "auth-provider": Auth.Provider,
  "history-provider": BrowserHistory.Provider,
  "store-provider": class AppStore extends Store.Provider<Model, Msg, Cmd> {
    constructor() {
      super(update, init);
    }
  },
  "app-header": HeaderElement,
  "recipe-card": RecipeCardElement,
  "recipe-list": RecipeListElement,
  "home-view": HomeViewElement,
  "about-view": AboutViewElement,
  "recipe-view": RecipeViewElement,
  "recipes-view": RecipesViewElement,
  "ingredients-view": IngredientsViewElement,
  "barcode-view": BarcodeViewElement,
  "saved-view": SavedViewElement,
  "history-view": HistoryViewElement,
  "edit-recipe-view": EditRecipeViewElement,
  "new-recipe-view": NewRecipeViewElement,
  "recipe-form": RecipeFormElement,
  "router-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes as any);
    }
  },
});
