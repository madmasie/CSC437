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
        click: () => this.scrollCarousel(-300),
      })
      .delegate(".arrow-right", {
        click: () => this.scrollCarousel(300),
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
      position: relative;
    }

    .carousel {
      flex: 1;
      display: flex;
      gap: var(--space-md);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding: var(--space-xs);
      scrollbar-width: none;
      padding: var(--space-xs) var(--space-2xs) var(--space-md);
    }
    .carousel::-webkit-scrollbar {
      display: none;
    }

    /* ---------- Arrows ---------- */
    .arrow {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--border, var(--color-card-text));
      background: var(--surface-card, var(--color-card-bg));
      color: var(--ink, var(--color-card-text));
      font-size: var(--text-xl);
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
      transition:
        background var(--duration-fast) var(--ease),
        color var(--duration-fast) var(--ease),
        transform var(--duration-fast) var(--ease),
        box-shadow var(--duration-fast) var(--ease);
    }
    .arrow:hover {
      background: var(--accent);
      color: var(--ink-on-accent);
      box-shadow: var(--shadow-md);
      transform: scale(1.05);
    }
    .arrow:active {
      transform: scale(0.97);
    }
  `;
}
