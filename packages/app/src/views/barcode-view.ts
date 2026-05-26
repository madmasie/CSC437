import { css, html, shadow } from "@unbndl/html";

export class BarcodeViewElement extends HTMLElement {
  static template = html`<template>
    <h2>Scan Barcode</h2>
    <p class="subtitle">Add ingredients by scanning product barcodes</p>
    <svg class="icon" aria-hidden="true">
      <use href="/icons/cats.svg#icon-working-cat" />
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
      .template(BarcodeViewElement.template)
      .styles(BarcodeViewElement.styles);
  }
}
