import { css, html, shadow } from "@unbndl/html";

export class RecipesViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Browse</p>
      <h2>Find a Recipe</h2>
      <p class="subtitle">Search and filter through the whole collection.</p>
      <p class="actions">
        <a class="new-btn" href="/app/recipe/new">+ New Recipe</a>
      </p>
    </header>

    <section class="section">
      <h3>Search</h3>
      <form class="search">
        <label class="visually-hidden" for="search">Search recipes</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="e.g. pasta, chicken, vegan…"
        />
        <button type="submit">Search</button>
      </form>
    </section>

    <section class="section">
      <h3>Filter Options</h3>
      <div class="filter-groups">
        <div class="filter-group">
          <span class="filter-label">Cooking type</span>
          <div class="filter-chips">
            <button class="chip" data-filter="Dinner">Dinner</button>
            <button class="chip" data-filter="Dessert">Dessert</button>
          </div>
        </div>
        <div class="filter-group">
          <span class="filter-label">Flavor</span>
          <div class="filter-chips">
            <button class="chip" data-filter="Savory">Savory</button>
            <button class="chip" data-filter="Creamy">Creamy</button>
            <button class="chip" data-filter="Sweet">Sweet</button>
            <button class="chip" data-filter="Spicy">Spicy</button>
          </div>
        </div>
        <div class="filter-group">
          <span class="filter-label">Difficulty</span>
          <div class="filter-chips">
            <button class="chip" data-filter="Easy">Easy</button>
            <button class="chip" data-filter="Medium">Medium</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3>All Recipes</h3>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/cats.svg#icon-thinking-cat" />
        </svg>
      </div>
      <recipe-list></recipe-list>
    </section>
  </template>`;

  static styles = css`
    :host {
      display: block;
      padding: var(--space-xl) var(--space-lg);
      max-width: var(--content-max);
      margin: 0 auto;
    }

    /* ---------- Header ---------- */
    .view-header {
      margin-bottom: var(--space-lg);
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
      margin: 0 0 var(--space-xs);
      font-family: var(--font-serif);
      font-size: var(--text-2xl);
      color: var(--ink-strong);
    }
    .subtitle {
      margin: 0;
      color: var(--ink-muted);
      font-family: var(--font-sans);
    }

    .actions {
      margin-top: var(--space-sm);
    }
    .new-btn {
      display: inline-block;
      padding: 8px 16px;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: var(--ink-on-accent);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      font-weight: 600;
      text-decoration: none;
    }
    .new-btn:hover {
      background: color-mix(in srgb, var(--accent) 85%, black);
    }

    /* ---------- Sections ---------- */
    .section {
      margin-bottom: var(--space-xl);
    }
    h3 {
      font-family: var(--font-serif);
      font-size: var(--text-lg);
      color: var(--ink-strong);
      margin: 0 0 var(--space-sm);
    }
    .muted {
      color: var(--ink-muted);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      margin-bottom: var(--space-sm);
    }

    .section-heading {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }
    .section-heading h3 {
      margin: 0;
    }
    .icon {
      height: 2em;
      width: 2em;
      fill: var(--accent);
    }

    /* ---------- Search ---------- */
    .search {
      display: flex;
      gap: var(--space-sm);
      flex-wrap: wrap;
    }
    .search input {
      flex: 1 1 240px;
      padding: 10px 14px;
      background: var(--surface-card-alt);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: var(--text-base);
      color: var(--ink);
      transition:
        border-color var(--duration-fast) var(--ease),
        box-shadow var(--duration-fast) var(--ease);
    }
    .search input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
    }
    .search button {
      padding: 10px 22px;
      border: 0;
      border-radius: var(--radius-sm);
      background: var(--accent);
      color: var(--ink-on-accent);
      font-family: var(--font-sans);
      font-size: var(--text-base);
      font-weight: 600;
      letter-spacing: 0.2px;
      cursor: pointer;
      transition: background var(--duration-fast) var(--ease);
    }
    .search button:hover {
      background: color-mix(in srgb, var(--accent) 85%, black);
    }

    /* ---------- Filter chips ---------- */
    .filter-groups {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex-wrap: wrap;
    }
    .filter-label {
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--ink-muted);
      min-width: 80px;
    }
    .filter-chips {
      display: flex;
      gap: var(--space-xs);
      flex-wrap: wrap;
    }
    .chip {
      padding: 5px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      background: var(--surface-card);
      color: var(--ink);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease);
    }
    .chip:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .chip.active {
      background: var(--accent);
      color: var(--ink-on-accent);
      border-color: var(--accent);
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  private activeFilters = new Set<string>();

  constructor() {
    super();
    shadow(this)
      .template(RecipesViewElement.template)
      .styles(RecipesViewElement.styles);

    this.shadowRoot!.querySelector(".search")!.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.shadowRoot!.querySelector<HTMLInputElement>("#search")!;
      const list = this.shadowRoot!.querySelector<any>("recipe-list")!;
      list.search = input.value.trim();
    });

    this.shadowRoot!.querySelector("#search")!.addEventListener("input", (e) => {
      const input = e.target as HTMLInputElement;
      const list = this.shadowRoot!.querySelector<any>("recipe-list")!;
      list.search = input.value.trim();
    });

    this.shadowRoot!.addEventListener("click", (e) => {
      const chip = (e.target as Element).closest<HTMLElement>(".chip");
      if (!chip) return;
      const filter = chip.dataset.filter!;
      if (this.activeFilters.has(filter)) {
        this.activeFilters.delete(filter);
        chip.classList.remove("active");
      } else {
        this.activeFilters.add(filter);
        chip.classList.add("active");
      }
      const list = this.shadowRoot!.querySelector<any>("recipe-list")!;
      list.filters = [...this.activeFilters];
    });
  }
}
