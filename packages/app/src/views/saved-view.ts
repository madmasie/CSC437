import { css, html, shadow } from "@unbndl/html";

export class SavedViewElement extends HTMLElement {
  static template = html`<template>
    <h2>Saved Recipes</h2>
    <p class="subtitle">Your personal recipe collection</p>
    <svg class="icon" aria-hidden="true">
      <use href="/icons/cats.svg#icon-heart-cat" />
    </svg>
    <p>stuff and more stuff</p>
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
      .template(SavedViewElement.template)
      .styles(SavedViewElement.styles);
  }
}
