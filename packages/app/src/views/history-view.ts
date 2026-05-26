import { css, html, shadow } from "@unbndl/html";

export class HistoryViewElement extends HTMLElement {
  static template = html`<template>
    <h2>History</h2>
    <p class="subtitle">Recipes you've recently viewed</p>
    <svg class="icon" aria-hidden="true">
      <use href="/icons/cats.svg#icon-laptop-cat" />
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
      .template(HistoryViewElement.template)
      .styles(HistoryViewElement.styles);
  }
}
