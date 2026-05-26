import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import { fromStore, Store } from "@unbndl/store";
import { Recipe } from "server/models";
import { Model } from "../model.ts";

interface RecipeViewAttributes {
  "recipe-id"?: string;
}

interface RecipeViewModel {
  recipeid?: string;
  recipe?: Recipe;
  token?: string;
}

export class RecipeViewElement extends HTMLElement {
  viewModel = createViewModel<RecipeViewModel>({})
    .withRenamed(fromAttributes<RecipeViewAttributes>(this), {
      recipeid: "recipe-id",
    })
    .with(fromStore<Model>(this), "recipe")
    .with(fromAuth(this), "token");

  view = html`
    <main class="recipe-layout">
      <div class="recipe-main">
        <section>
          <h2>Ingredients</h2>
          <ul>
            ${($: any) =>
              ($.recipe?.ingredients || []).map(
                (i: string) => html`<li>${i}</li>`,
              )}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          <ol>
            ${($: any) =>
              ($.recipe?.instructions || []).map(
                (s: string) => html`<li>${s}</li>`,
              )}
          </ol>
        </section>
      </div>
      <aside class="recipe-sidebar">
        <ul class="tags">
          <li class="tag">
            <span>difficulty:</span> ${($: any) => $.recipe?.difficulty}
          </li>
          <li class="tag"><span>time:</span> ${($: any) => $.recipe?.time}</li>
        </ul>
      </aside>
    </main>
  `;

  static styles = css`
    .recipe-layout {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: var(--space-lg);
      padding: var(--space-lg);
    }
    h2 {
      color: var(--color-coral);
      margin-bottom: var(--space-sm);
    }
    .tags {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .tag span {
      font-weight: 600;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .styles(RecipeViewElement.styles)
      .replace(this.viewModel.render(this.view));

    this.viewModel.createEffect(($: any) => {
      if ($.recipeid && $.token) {
        Store.dispatch(this, ["recipe/request", { id: $.recipeid }]);
      }
    });
  }
}
