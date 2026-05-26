import { html, css, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";

export class HeaderElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    username: undefined,
    token: undefined,
  }).with(fromAuth(this), "authenticated", "username", "token");

  view = html`
    <header>
      <a href="/app" aria-label="Home">
        <svg class="icon" aria-hidden="true">
          <use href="/icons/cats.svg#icon-plump-cat" />
        </svg>
      </a>
      <div class="header-title">
        <h1>Maddie's Recipe Collection</h1>
        <p class="header-subtitle">Maddie's homemade recipe collection</p>
      </div>
      <nav class=${($: any) => ($.authenticated ? "logged-in" : "logged-out")}>
        <p>Hello, ${($: any) => $.username || "new user"}</p>
        <menu>
          <li class="when-signed-in">
            <button>Sign Out</button>
          </li>
          <li class="when-signed-out">
            <a href="/login.html">Sign In</a>
          </li>
        </menu>
      </nav>
    </header>
  `;

  static styles = css`
    li {
      display: none;
    }
    .logged-in .when-signed-in,
    .logged-out .when-signed-out {
      display: block;
    }
    header {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background-color: var(--color-background-header);
      color: var(--color-text-header);
    }
    nav {
      margin-left: auto;
    }
    .icon {
      height: 2.5em;
      width: 2.5em;
      fill: currentColor;
    }
    menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    p {
      margin: 0;
    }
    a {
      color: inherit;
    }
    button {
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .styles(HeaderElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate(".when-signed-in button", {
        click: () => this.signout(),
      });
  }

  signout() {
    this.dispatchEvent(
      new CustomEvent("auth:message", {
        bubbles: true,
        composed: true,
        detail: ["auth/signout"],
      }),
    );
  }
}
