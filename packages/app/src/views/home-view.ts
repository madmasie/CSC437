import { css, html, shadow } from "@unbndl/html";

export class HomeViewElement extends HTMLElement {
  static template = html`<template>
    <main>
      <section>
        <h2>Featured Recipes</h2>
        <recipe-list src="/api/recipes"></recipe-list>
      </section>
    </main>
  </template>`;
  static styles = css`
    .nav-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-sm);
      list-style: none;
      padding: var(--space-md) var(--space-lg);
      margin: 0;
    }
    .nav-buttons li {
      display: contents;
    }
    .nav-btn {
      display: inline-block;
      padding: 10px 22px;
      flex: 1 1 0;
      text-align: center;
      background: var(--color-button-bg);
      border: 2px solid var(--color-card-text);
      border-radius: 8px;
      font-family: "Inter", sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-card-text);
      text-decoration: none;
      transition:
        background 0.15s,
        color 0.15s;
      white-space: nowrap;
    }
    .nav-btn:hover {
      background: var(--color-card-text);
      color: var(--color-button-bg);
    }
    main {
      padding: var(--space-lg);
    }
    h2 {
      color: var(--color-coral);
      margin-bottom: var(--space-sm);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HomeViewElement.template)
      .styles(HomeViewElement.styles);

    this.shadowRoot!.addEventListener("click", (e) => {
      const a = (e.target as Element).closest("a");
      if (!a) return;
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("history:message", {
          bubbles: true,
          composed: true,
          detail: ["history/navigate", { href: a.getAttribute("href") }],
        }),
      );
    });
  }
}
