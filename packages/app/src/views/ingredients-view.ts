import { css, html, shadow } from "@unbndl/html";

export class IngredientsViewElement extends HTMLElement {
  static template = html`<template>
    <h2>My Ingredients</h2>
    <p class="subtitle">Track what's in your kitchen</p>
    <svg class="icon" aria-hidden="true">
      <use href="/icons/cats.svg#icon-eepy-cat" />
    </svg>
    <p>stuff</p>
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
  `;

  constructor() {
    super();
    shadow(this)
      .template(IngredientsViewElement.template)
      .styles(IngredientsViewElement.styles);
  }
}
