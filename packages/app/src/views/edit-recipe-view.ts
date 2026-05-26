import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import { fromStore, Store } from "@unbndl/store";
import { Recipe } from "server/models";
import { Model } from "../model.ts";

interface EditRecipeAttributes {
  "recipe-id"?: string;
}

interface EditRecipeViewModel {
  recipeid?: string;
  recipe?: Recipe;
  token?: string;
}

export class EditRecipeViewElement extends HTMLElement {
  viewModel = createViewModel<EditRecipeViewModel>({})
    .withRenamed(fromAttributes<EditRecipeAttributes>(this), {
      recipeid: "recipe-id",
    })
    .with(fromStore<Model>(this), "recipe")
    .with(fromAuth(this), "token");

  private formEl?: HTMLElement;

  view = html`
    <main class="edit-layout">
      <h2>Edit Recipe</h2>
      <recipe-form><span slot="submit-label">Save</span></recipe-form>
      <p class="error" hidden></p>
    </main>
  `;

  static styles = css`
    .edit-layout {
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    h2 {
      color: var(--color-coral);
    }
    .error {
      color: #b00020;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .styles(EditRecipeViewElement.styles)
      .replace(this.viewModel.render(this.view));

    // Request the recipe from the store when we know the id and have a token.
    this.viewModel.createEffect(($: any) => {
      if ($.recipeid && $.token) {
        Store.dispatch(this, ["recipe/request", { id: $.recipeid }]);
      }
    });

    // Populate the form once the recipe is in the store.
    this.viewModel.createEffect(($: any) => {
      if (!this.formEl) {
        this.formEl = this.shadowRoot!.querySelector("recipe-form") as HTMLElement;
      }
      if (this.formEl && $.recipe) {
        (this.formEl as any).init = $.recipe;
      }
    });

    // Listen for form submission.
    this.shadowRoot!.addEventListener("recipe-form:submit", (ev) => {
      const recipe = (ev as CustomEvent<Recipe>).detail;
      const id = this.viewModel.get("recipeid") as string | undefined;
      if (!id) return;
      Store.dispatch(this, [
        "recipe/save",
        {
          id,
          recipe,
          onSuccess: () =>
            this.dispatchEvent(
              new CustomEvent("history:message", {
                bubbles: true,
                composed: true,
                detail: ["history/navigate", { href: `/app/recipe/${recipe.id}` }],
              })
            ),
          onFailure: (err: Error) => {
            const errEl = this.shadowRoot!.querySelector(".error") as HTMLElement;
            errEl.hidden = false;
            errEl.textContent = err.message;
          },
        },
      ]);
    });
  }
}
