import { html, css, shadow } from "@unbndl/html";
import { Recipe } from "server/models";

/**
 * A simple recipe form component. Pre-fills inputs from the `init` property
 * (set imperatively after construction). On submit, dispatches a bubbling,
 * composed `recipe-form:submit` CustomEvent whose `detail` is the Recipe.
 */
export class RecipeFormElement extends HTMLElement {
  private _init: Partial<Recipe> | undefined;

  set init(value: Partial<Recipe> | undefined) {
    this._init = value;
    this.populate();
  }

  get init(): Partial<Recipe> | undefined {
    return this._init;
  }

  static template = html`<template>
    <form>
      <label>
        <span>ID (URL slug):</span>
        <input name="id" required />
      </label>
      <label>
        <span>Title:</span>
        <input name="title" required />
      </label>
      <label>
        <span>Description:</span>
        <input name="description" />
      </label>
      <label>
        <span>Difficulty:</span>
        <select name="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </label>
      <label>
        <span>Time:</span>
        <input name="time" placeholder="e.g. 30 min" />
      </label>
      <label>
        <span>Icon:</span>
        <input name="icon" placeholder="icon-loving-cat" />
      </label>
      <label class="block">
        <span>Ingredients (one per line):</span>
        <textarea name="ingredients" rows="6"></textarea>
      </label>
      <label class="block">
        <span>Instructions (one per line):</span>
        <textarea name="instructions" rows="8"></textarea>
      </label>
      <div class="actions">
        <button type="submit"><slot name="submit-label">Save</slot></button>
      </div>
    </form>
  </template>`;

  static styles = css`
    :host {
      display: block;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    label {
      display: grid;
      grid-template-columns: 140px 1fr;
      align-items: center;
      gap: var(--space-sm);
    }
    label.block {
      grid-template-columns: 1fr;
    }
    input,
    select,
    textarea {
      padding: 6px 10px;
      border: 1px solid var(--color-card-text);
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }
    textarea {
      resize: vertical;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--space-sm);
    }
    button {
      padding: 8px 18px;
      background: var(--color-button-bg);
      border: 2px solid var(--color-card-text);
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(RecipeFormElement.template)
      .styles(RecipeFormElement.styles);

    const form = this.shadowRoot!.querySelector("form")!;
    form.addEventListener("submit", (ev) => this.handleSubmit(ev));
  }

  connectedCallback() {
    this.populate();
  }

  private populate() {
    const root = this.shadowRoot;
    if (!root || !this._init) return;
    const setValue = (name: keyof Recipe, value: any) => {
      const el = root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        `[name="${name}"]`
      );
      if (!el) return;
      if (Array.isArray(value)) el.value = value.join("\n");
      else el.value = value ?? "";
    };
    setValue("id", this._init.id);
    setValue("title", this._init.title);
    setValue("description", this._init.description);
    setValue("difficulty", this._init.difficulty);
    setValue("time", this._init.time);
    setValue("icon", this._init.icon);
    setValue("ingredients", this._init.ingredients);
    setValue("instructions", this._init.instructions);
  }

  private handleSubmit(ev: Event) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const data = new FormData(form);
    const linesOf = (raw: FormDataEntryValue | null): string[] =>
      String(raw ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    const recipe: Recipe = {
      id: String(data.get("id") || "").trim(),
      title: String(data.get("title") || "").trim(),
      description: String(data.get("description") || "").trim(),
      difficulty: (String(data.get("difficulty") || "easy") as Recipe["difficulty"]),
      time: String(data.get("time") || "").trim(),
      icon: String(data.get("icon") || "").trim(),
      href: `/app/recipe/${String(data.get("id") || "").trim()}`,
      ingredients: linesOf(data.get("ingredients")),
      instructions: linesOf(data.get("instructions")),
    };

    this.dispatchEvent(
      new CustomEvent<Recipe>("recipe-form:submit", {
        bubbles: true,
        composed: true,
        detail: recipe,
      })
    );
  }
}
