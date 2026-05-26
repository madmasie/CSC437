import { css, html, shadow } from "@unbndl/html";
import { Store } from "@unbndl/store";
import { Recipe } from "server/models";

export class NewRecipeViewElement extends HTMLElement {
  static template = html`<template>
    <main class="new-layout">
      <h2>New Recipe</h2>
      <recipe-form><span slot="submit-label">Create</span></recipe-form>
      <p class="error" hidden></p>
    </main>
  </template>`;

  static styles = css`
    .new-layout {
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
      .template(NewRecipeViewElement.template)
      .styles(NewRecipeViewElement.styles);

    this.shadowRoot!.addEventListener("recipe-form:submit", (ev) => {
      const recipe = (ev as CustomEvent<Recipe>).detail;
      Store.dispatch(this, [
        "recipe/create",
        {
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
