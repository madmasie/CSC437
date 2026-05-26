import { html, css, shadow } from "@unbndl/html";

export class RecipeCardElement extends HTMLElement {
  static template = html`
    <template>
      <a part="link">
        <div class="media">
          <img class="thumb" alt="" />
          <svg class="icon" aria-hidden="true"><use /></svg>
        </div>
        <div class="body">
          <h3><slot name="title"></slot></h3>
          <p class="description"><slot name="description"></slot></p>
          <ul class="tags">
            <li class="tag">
              <span class="tag-label">difficulty</span>
              <slot name="difficulty"></slot>
            </li>
            <li class="tag">
              <span class="tag-label">time</span>
              <slot name="time"></slot>
            </li>
          </ul>
        </div>
      </a>
    </template>
  `;

  constructor() {
    super();
    shadow(this)
      .template(RecipeCardElement.template)
      .styles(RecipeCardElement.styles);
  }

  static observedAttributes = ["href", "icon", "image"];

  attributeChangedCallback(name: string, _: string, val: string) {
    const root = this.shadowRoot;
    if (!root) return;
    if (name === "href")
      (root.querySelector("a") as HTMLAnchorElement).href = val;
    if (name === "icon")
      root.querySelector("use")!.setAttribute("href", `/icons/cats.svg#${val}`);
    if (name === "image") {
      const img = root.querySelector(".thumb") as HTMLImageElement;
      const svg = root.querySelector(".icon") as HTMLElement;
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
      flex: 0 0 280px;
      scroll-snap-align: start;
    }

    a {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--surface-card, var(--color-card-bg));
      border: 1px solid var(--border, var(--color-card-text));
      border-radius: var(--radius-lg);
      overflow: hidden;
      text-decoration: none;
      color: var(--ink, var(--color-card-text));
      box-shadow: var(--shadow-sm);
      transition:
        transform var(--duration) var(--ease),
        box-shadow var(--duration) var(--ease),
        border-color var(--duration) var(--ease);
    }
    a:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: color-mix(in srgb, var(--accent) 40%, transparent);
    }

    /* ---------- Media ---------- */
    .media {
      position: relative;
      aspect-ratio: 4 / 3;
      background: var(--surface-sunken, var(--color-cream-deep, #efe3d3));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration) var(--ease);
    }
    a:hover .thumb {
      transform: scale(1.04);
    }
    .icon {
      height: 6em;
      width: 6em;
      fill: color-mix(in srgb, var(--ink) 55%, transparent);
    }

    /* ---------- Body ---------- */
    .body {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-md);
      flex: 1;
    }
    h3 {
      margin: 0;
      font-family: var(--font-serif);
      font-size: var(--text-md);
      font-weight: 700;
      color: var(--ink-strong, var(--color-card-text));
      line-height: var(--leading-snug);
    }
    .description {
      margin: 0;
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      color: var(--ink-muted);
      line-height: var(--leading-snug);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ---------- Tags ---------- */
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin: var(--space-xs) 0 0;
      padding: 0;
      list-style: none;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: var(--surface-sunken);
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--ink);
      letter-spacing: 0.2px;
    }
    .tag-label {
      color: var(--ink-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 10px;
    }
  `;
}
