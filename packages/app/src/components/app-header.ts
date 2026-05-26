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
      <div class="header-top">
        <a href="/app" class="home-link" aria-label="Home">
          <svg class="icon" aria-hidden="true">
            <use href="/icons/cats.svg#icon-plump-cat" />
          </svg>
          <div class="header-title">
            <h1>Maddie's Recipe Collection</h1>
            <p class="header-subtitle">Maddie's homemade recipe collection</p>
          </div>
        </a>
        <nav
          class=${($: any) =>
            $.authenticated ? "auth-nav logged-in" : "auth-nav logged-out"}
        >
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
      </div>
      <nav class="site-nav">
        <a href="/app/recipes">Browse &amp; Filter</a>
        <a href="/app/ingredients">My Ingredients</a>
        <a href="/app/barcode">Scan Barcodes</a>
        <a href="/app/saved">Saved Recipes</a>
        <a href="/app/history">History</a>
        <a href="/app/about">About</a>
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
      flex-direction: column;
      background-color: var(--color-background-header);
      color: var(--color-text-header);
      font-family: "Inter", sans-serif;
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md) var(--space-lg);
    }
    .home-link {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      color: inherit;
      text-decoration: none;
    }
    .icon {
      height: 2.5em;
      width: 2.5em;
      fill: currentColor;
      flex-shrink: 0;
    }
    .header-title h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }
    .header-subtitle {
      margin: 0;
      font-size: 12px;
      opacity: 0.75;
    }
    .auth-nav {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 14px;
    }
    .auth-nav p {
      margin: 0;
      opacity: 0.85;
    }
    menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .auth-nav a,
    .auth-nav button {
      padding: 5px 14px;
      border: 1px solid var(--color-text-header);
      border-radius: 999px;
      color: var(--color-text-header);
      background: transparent;
      text-decoration: none;
      font-size: 13px;
      font-family: "Inter", sans-serif;
      cursor: pointer;
      transition:
        background 0.15s,
        color 0.15s;
    }
    .auth-nav a:hover,
    .auth-nav button:hover {
      background: var(--color-text-header);
      color: var(--color-background-header);
    }
    .site-nav {
      display: flex;
      gap: 2px;
      padding: 0 var(--space-lg) var(--space-sm);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: var(--space-sm);
    }
    .site-nav a {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-header);
      text-decoration: none;
      opacity: 0.8;
      white-space: nowrap;
      transition:
        background 0.15s,
        opacity 0.15s;
    }
    .site-nav a:hover {
      background: rgba(255, 255, 255, 0.12);
      opacity: 1;
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

    this.shadowRoot!.addEventListener("click", (e) => {
      const a = (e.target as Element).closest(".site-nav a");
      if (!a) return;
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("history:message", {
          bubbles: true,
          composed: true,
          detail: ["history/navigate", { href: a.getAttribute("href") }],
        }),
      );
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
