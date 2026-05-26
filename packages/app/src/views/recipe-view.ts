import { css, html, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";

interface Recipe {
  id?: string;
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  difficulty?: string;
  time?: string;
}

interface RecipeViewModel {
  token?: string;
  recipe?: Recipe;
}

export class RecipeViewElement extends HTMLElement {
  viewModel = createViewModel<RecipeViewModel>({}).with(
    fromAuth(this),
    "token",
  );

  static observedAttributes = ["recipe-id"];

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "recipe-id" && newValue) {
      this.fetchRecipe(newValue);
    }
  }

  fetchRecipe(id: string) {
    const token = this.viewModel.get("token");
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    fetch(`/api/recipes/${id}`, { headers })
      .then((r) => r.json())
      .then((recipe: Recipe) => this.viewModel.set("recipe", recipe))
      .catch(console.error);
  }

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
  }
}
