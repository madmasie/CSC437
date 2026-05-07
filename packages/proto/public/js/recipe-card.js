import { html, css, shadow } from "@unbndl/html";
import reset from "./styles/reset.css.js";

export class RecipeCardElement extends HTMLElement {
  static template = html`
    <template>
      <a part="link">
        <img class="thumb" alt="" />
        <svg class="icon" aria-hidden="true"><use /></svg>
        <div class="body">
          <h3><slot name="title"></slot></h3>
          <p><slot name="description"></slot></p>
          <ul class="tags">
            <li class="tag"><span>difficulty:</span> <slot name="difficulty"></slot></li>
            <li class="tag"><span>time:</span> <slot name="time"></slot></li>
          </ul>
        </div>
      </a>
    </template>
  `;

  constructor() {
    super();
    shadow(this)
      .template(RecipeCardElement.template)
      .styles(reset.styles, RecipeCardElement.styles);
  }

  static observedAttributes = ["href", "icon", "image", "difficulty", "time"];

  attributeChangedCallback(name, _, val) {
    const root = this.shadowRoot;
    if (!root) return;
    if (name === "href") root.querySelector("a").href = val;
    if (name === "icon") root.querySelector("use").setAttribute("href", `/icons/cats.svg#${val}`);
    if (name === "image") {
      const img = root.querySelector(".thumb");
      const svg = root.querySelector(".icon");
      if (val) {
        img.src = val;
        img.hidden = false;
        svg.hidden = true;
      } else {
        img.hidden = true;
        svg.hidden = false;
      }
    }
  }

  static styles = css`
    :host {
      display: flex;
      flex: 0 0 260px;
      scroll-snap-align: start;
    }
    a {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      background: var(--color-card-bg);
      border: 1px solid var(--color-card-text);
      border-radius: 10px;
      padding: var(--space-md);
      text-decoration: none;
      color: var(--color-card-text);
      transition: background 0.15s;
    }
    a:hover { background: color-mix(in srgb, var(--color-card-text) 12%, var(--color-card-bg)); }
    .icon { display: inline; height: 6em; width: 6em; fill: var(--color-card-text); }
    .thumb { width: 100%; height: 160px; object-fit: cover; border-radius: 6px; display: block; }
    .body { text-align: center; flex: 1; }
    h3 { margin: var(--space-sm) 0 var(--space-xs); font-size: 16px; font-family: 'Playfair Display', serif; }
    p { margin: 0 0 10px; font-size: 13px; opacity: 0.7; font-family: 'Inter', sans-serif; }
    .tags { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-sm); list-style: none; padding: 0; }
    .tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      border: 1px solid var(--color-card-text);
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
    }
    .tag span { opacity: 0.6; margin-right: 4px; }
  `;
}