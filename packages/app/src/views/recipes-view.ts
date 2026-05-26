import { css, html, shadow } from "@unbndl/html";

export class RecipesViewElement extends HTMLElement {
  static template = html`<template>
    <h2>Find a Recipe</h2>
    <p class="subtitle">Browse all recipes in the collection</p>
    <section>
      <h3>Search</h3>
      <form>
        <label for="search">Search Recipes:</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="e.g., pasta, chicken, vegan..."
        />
        <button type="submit">Search</button>
      </form>
    </section>
    <section>
      <h3>Filter Options</h3>
      <p>
        (Here are some clickable options that will appear based on search,
        coming soon...):
      </p>
      <ul class="recipe-grid">
        <li>
          <strong>Cooking Type:</strong> Breakfast, Lunch, Dinner, Dessert
        </li>
        <li><strong>Flavor Profile:</strong> Savory, Creamy, Sweet, Spicy</li>
        <li><strong>Difficulty Level:</strong> Easy, Medium, Hard</li>
        <li><strong>Budget Type:</strong> Budget-friendly, Non-budget</li>
        <li>
          <strong>Dietary Restrictions:</strong> Dairy-free, Gluten-free,
          Vegetarian
        </li>
      </ul>
    </section>
    <section>
      <h3>
        All Recipes
        <svg class="icon" aria-hidden="true">
          <use href="/icons/cats.svg#icon-thinking-cat" />
        </svg>
      </h3>
      <recipe-list></recipe-list>
    </section>
  </template>`;

  static styles = css`
    :host {
      display: block;
      padding: var(--space-lg);
    }
    h2 {
      color: var(--color-coral);
    }
    .subtitle {
      color: var(--color-text-muted, var(--color-text));
      margin-bottom: var(--space-md);
    }
    h3 {
      margin-bottom: var(--space-sm);
    }
    section {
      margin-bottom: var(--space-lg);
    }
    form {
      display: flex;
      gap: var(--space-sm);
      flex-wrap: wrap;
      align-items: center;
    }
    input {
      padding: 8px 12px;
      border: 1px solid var(--color-card-text);
      border-radius: 6px;
      font-size: 15px;
      flex: 1 1 200px;
    }
    button {
      padding: 8px 18px;
      background: var(--color-button-bg);
      border: 2px solid var(--color-card-text);
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
    }
    .recipe-grid {
      list-style: disc;
      padding-left: var(--space-lg);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(RecipesViewElement.template)
      .styles(RecipesViewElement.styles);
  }
}
