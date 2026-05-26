import { html, shadow } from "@unbndl/html";
import { stubViewStyles } from "./_shared.ts";

export class IngredientsViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Pantry</p>
      <h2>My Ingredients</h2>
      <p class="subtitle">Track what's in your kitchen.</p>
    </header>
    <div class="empty-state">
      <svg class="empty-icon" aria-hidden="true">
        <use href="/icons/cats.svg#icon-eepy-cat" />
      </svg>
      <p class="empty-title">Your pantry is empty</p>
      <p class="empty-body">
        Add ingredients to get personalized recipe suggestions based on what you
        already have.
      </p>
    </div>
  </template>`;

  constructor() {
    super();
    shadow(this).template(IngredientsViewElement.template).styles(stubViewStyles);
  }
}
