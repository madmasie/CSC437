import { define, html } from "@unbndl/html";
import { Auth } from "@unbndl/auth";
import { BrowserHistory, Switch } from "@unbndl/switch";
import { HeaderElement } from "./components/app-header.ts";
import { RecipeCardElement } from "./components/recipe-card.ts";
import { RecipeListElement } from "./components/recipe-list.ts";
import { HomeViewElement } from "./views/home-view.ts";
import { AboutViewElement } from "./views/about-view.ts";
import { RecipeViewElement } from "./views/recipe-view.ts";

const routes = [
  {
    path: "/app/recipe/:id",
    view: html`<recipe-view
      recipe-id=${($: any) => $.params.id}
    ></recipe-view>`,
  },
  {
    path: "/app/about",
    view: html`<about-view></about-view>`,
  },
  {
    path: "/app",
    view: html`<home-view></home-view>`,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

define({
  "auth-provider": Auth.Provider,
  "history-provider": BrowserHistory.Provider,
  "app-header": HeaderElement,
  "recipe-card": RecipeCardElement,
  "recipe-list": RecipeListElement,
  "home-view": HomeViewElement,
  "about-view": AboutViewElement,
  "recipe-view": RecipeViewElement,
  "router-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes);
    }
  },
});
