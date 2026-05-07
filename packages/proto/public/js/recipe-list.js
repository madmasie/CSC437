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
        shadow(this).replace(RecipeListElement.render(data));
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
    return html`<div class="carousel">${(data || []).map(renderCard)}</div>`;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .carousel {
      display: flex;
      gap: var(--space-md);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: var(--space-xs);
    }
  `;
}