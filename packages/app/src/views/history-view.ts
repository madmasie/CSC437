import { html, shadow } from "@unbndl/html";
import { stubViewStyles } from "./_shared.ts";

export class HistoryViewElement extends HTMLElement {
  static template = html`<template>
    <header class="view-header">
      <p class="eyebrow">Activity</p>
      <h2>History</h2>
      <p class="subtitle">Recipes you've recently viewed.</p>
    </header>
    <div class="empty-state">
      <svg class="empty-icon" aria-hidden="true">
        <use href="/icons/cats.svg#icon-laptop-cat" />
      </svg>
      <p class="empty-title">Nothing here yet</p>
      <p class="empty-body">
        Recipes will start appearing here once you've taken a look around.
      </p>
    </div>
  </template>`;

  constructor() {
    super();
    shadow(this).template(HistoryViewElement.template).styles(stubViewStyles);
  }
}
