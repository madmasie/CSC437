import { html, shadow } from "@unbndl/html";
import { stubViewStyles } from "./_shared.ts";

export class SavedViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Library</p>
      <h2>Saved Recipes</h2>
      <p class="subtitle">Your personal recipe collection.</p>
    </header>
    <div class="empty-state">
      <svg class="empty-icon" aria-hidden="true">
        <use href="/icons/cats.svg#icon-heart-cat" />
      </svg>
      <p class="empty-title">No saved recipes yet</p>
      <p class="empty-body">
        Hit the heart on any recipe and it will land here for safekeeping.
      </p>
    </div>
  </template>`;

  constructor() {
    super();
    shadow(this).template(SavedViewElement.template).styles(stubViewStyles);
  }
}
