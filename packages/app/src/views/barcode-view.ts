import { html, shadow } from "@unbndl/html";
import { stubViewStyles } from "./_shared.ts";

export class BarcodeViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Pantry</p>
      <h2>Scan Barcodes</h2>
      <p class="subtitle">Add ingredients by scanning product barcodes.</p>
    </header>
    <div class="empty-state">
      <svg class="empty-icon" aria-hidden="true">
        <use href="/icons/cats.svg#icon-working-cat" />
      </svg>
      <p class="empty-title">Scanner coming soon</p>
      <p class="empty-body">
        Point your camera at a barcode and we'll log the ingredient for you.
      </p>
    </div>
  </template>`;

  constructor() {
    super();
    shadow(this).template(BarcodeViewElement.template).styles(stubViewStyles);
  }
}
