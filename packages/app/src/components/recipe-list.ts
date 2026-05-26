import { html, css, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import { fromStore, Store } from "@unbndl/store";
import { Recipe } from "server/models";
import { Model } from "../model.ts";

function renderCard({
  href,
  icon,
  image,
  title,
  description,
  difficulty,
  time,
}: any) {
  return html`
    <recipe-card href=${href} icon=${icon} image=${image || ""}>
      <span slot="title">${title}</span>
      <span slot="description">${description}</span>
      <span slot="difficulty">${difficulty}</span>
      <span slot="time">${time}</span>
    </recipe-card>
  `;
}

interface RecipeListViewModel {
  token?: string;
  recipes?: Recipe[];
}

export class RecipeListElement extends HTMLElement {
  viewModel = createViewModel<RecipeListViewModel>({})
    .with(fromAuth(this), "token")
    .with(fromStore<Model>(this), "recipes");

  view = html`
    <div class="carousel-wrapper">
      <button class="arrow arrow-left" aria-label="Scroll left">
        &#8249;
      </button>
      <div class="carousel">
        ${($: any) => ($.recipes || []).map(renderCard)}
      </div>
      <button class="arrow arrow-right" aria-label="Scroll right">
        &#8250;
      </button>
    </div>
  `;

  constructor() {
    super();
    shadow(this)
      .styles(RecipeListElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate(".arrow-left", {
        click: () => this.scrollCarousel(-280),
      })
      .delegate(".arrow-right", {
        click: () => this.scrollCarousel(280),
      });

    this.viewModel.createEffect(($: any) => {
      if ($.token && !$.recipes) {
        Store.dispatch(this, ["recipes/request"]);
      }
    });
  }

  scrollCarousel(dx: number) {
    this.shadowRoot!
      .querySelector(".carousel")!
      .scrollBy({ left: dx, behavior: "smooth" });
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
    .carousel::-webkit-scrollbar {
      display: none;
    }
    .arrow {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--color-card-text);
      background: var(--color-card-bg);
      color: var(--color-card-text);
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        background 0.15s,
        color 0.15s;
    }
    .arrow:hover {
      background: var(--color-card-text);
      color: var(--color-card-bg);
    }
  `;
}
