import { css, html, shadow } from "@unbndl/html";

export class HomeViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Welcome back</p>
      <h2>Featured Recipes</h2>
      <p class="subtitle">A few favorites from the collection.</p>
    </header>
    <section class="section">
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
      font-size: var(--text-2xl);
      font-family: var(--font-serif);
      color: var(--ink-strong);
      font-weight: 700;
    }
    .subtitle {
      margin: 0;
      color: var(--ink-muted);
      font-family: var(--font-sans);
      font-size: var(--text-base);
    }

    .section {
      margin-bottom: var(--space-xl);
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
