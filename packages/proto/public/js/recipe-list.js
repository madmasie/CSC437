import { html, css, shadow } from "@unbndl/html";

function renderCard({ href, icon, title, description, difficulty, time }) {
  return html`
    <recipe-card href=${href} icon=${icon}>
      <span slot="title">${title}</span>
      <span slot="description">${description}</span>
      <span slot="difficulty">${difficulty}</span>
      <span slot="time">${time}</span>
    </recipe-card>
  `;
}

export class RecipeListElement extends HTMLElement {
  constructor() {
    super();
    shadow(this).styles(RecipeListElement.styles);
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, _, newValue) {
    if (name === "src") {
      this.hydrate(newValue).then((data) => {
        const frag = shadow(this).replace(RecipeListElement.render(data));
        const root = this.shadowRoot;
        const carousel = root.querySelector(".carousel");
        root.querySelector(".arrow-left").addEventListener("click", () => {
          carousel.scrollBy({ left: -280, behavior: "smooth" });
        });
        root.querySelector(".arrow-right").addEventListener("click", () => {
          carousel.scrollBy({ left: 280, behavior: "smooth" });
        });
      });
    }
  }

  hydrate(src) {
    return fetch(src)
      .then((response) => {
        if (response.status !== 200) throw `HTTP Status ${response.status}`;
        return response.json();
      })
      .catch((error) => console.log(`Could not fetch ${src}:`, error));
  }

  static render(data) {
    return html`
      <div class="carousel-wrapper">
        <button class="arrow arrow-left" aria-label="Scroll left">&#8249;</button>
        <div class="carousel">${(data || []).map(renderCard)}</div>
        <button class="arrow arrow-right" aria-label="Scroll right">&#8250;</button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .carousel-wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    .carousel {
      flex: 1;
      display: flex;
      gap: var(--space-md);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding-bottom: var(--space-xs);
    }
    .carousel::-webkit-scrollbar { display: none; }
    .arrow {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--color-card-text);
      background: var(--color-card-bg);
      color: var(--color-card-text);
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .arrow:hover {
      background: var(--color-card-text);
      color: var(--color-card-bg);
    }
  `;
}
