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
    <article class="recipe">
      <header class="recipe-header">
        <p class="eyebrow">Recipe</p>
        <h2>${($: any) => $.recipe?.title || "Loading…"}</h2>
        <p class="description">${($: any) => $.recipe?.description || ""}</p>
        <ul class="meta">
          <li class="tag">
            <span class="tag-label">difficulty</span>
            ${($: any) => $.recipe?.difficulty || "—"}
          </li>
          <li class="tag">
            <span class="tag-label">time</span>
            ${($: any) => $.recipe?.time || "—"}
          </li>
        </ul>
        <p class="actions">
          <a class="action" href=${($: any) => `/app/recipe/${$.recipeid}/edit`}>Edit</a>
        </p>
      </header>

      <div class="recipe-body">
        <aside class="ingredients">
          <h3>Ingredients</h3>
          <ul>
            ${($: any) =>
              ($.recipe?.ingredients || []).map(
                (i: string) => html`<li>${i}</li>`,
              )}
          </ul>
        </aside>

        <section class="instructions">
          <h3>Instructions</h3>
          <ol>
            ${($: any) =>
              ($.recipe?.instructions || []).map(
                (s: string) => html`<li>${s}</li>`,
              )}
          </ol>
        </section>
      </div>
    </article>
  `;

  static styles = css`
    :host {
      display: block;
      padding: var(--space-xl) var(--space-lg);
      max-width: var(--content-max);
      margin: 0 auto;
    }

    .recipe-header {
      margin-bottom: var(--space-xl);
      padding-bottom: var(--space-lg);
      border-bottom: 1px solid var(--border);
    }
    .eyebrow {
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--accent);
      margin: 0 0 var(--space-xs);
    }
    h2 {
      margin: 0 0 var(--space-sm);
      font-family: var(--font-serif);
      font-size: var(--text-2xl);
      color: var(--ink-strong);
      font-weight: 700;
    }
    .description {
      margin: 0 0 var(--space-md);
      color: var(--ink-muted);
      font-family: var(--font-sans);
      font-size: var(--text-base);
      max-width: 60ch;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      background: var(--surface-sunken);
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--ink);
    }
    .tag-label {
      color: var(--ink-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 10px;
    }

    .actions {
      margin-top: var(--space-md);
    }
    .action {
      display: inline-block;
      padding: 6px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      color: var(--ink);
      text-decoration: none;
    }
    .action:hover {
      background: var(--surface-sunken);
    }

    /* ---------- Body grid ---------- */
    .recipe-body {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-xl);
      align-items: start;
    }
    @media (max-width: 720px) {
      .recipe-body {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }
    }

    h3 {
      font-family: var(--font-serif);
      font-size: var(--text-lg);
      color: var(--ink-strong);
      margin: 0 0 var(--space-md);
    }

    /* ---------- Ingredients sidebar ---------- */
    .ingredients {
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-md) var(--space-lg);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: var(--space-lg);
    }
    .ingredients ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
    }
    .ingredients li {
      padding-left: var(--space-md);
      position: relative;
    }
    .ingredients li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }

    /* ---------- Instructions ---------- */
    .instructions ol {
      list-style: none;
      padding: 0;
      margin: 0;
      counter-reset: step;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .instructions li {
      counter-increment: step;
      padding: var(--space-md) var(--space-lg);
      padding-left: calc(var(--space-xl) + var(--space-md));
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      position: relative;
      font-family: var(--font-serif);
      font-size: var(--text-base);
      line-height: var(--leading-body);
      color: var(--ink);
    }
    .instructions li::before {
      content: counter(step);
      position: absolute;
      left: var(--space-md);
      top: var(--space-md);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--ink-on-accent);
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: var(--text-sm);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
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
