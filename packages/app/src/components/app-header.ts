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
          <svg class="brand-icon" aria-hidden="true">
            <use href="/icons/cats.svg#icon-plump-cat" />
          </svg>
          <div class="header-title">
            <h1>Maddie's Recipe Collection</h1>
            <p class="header-subtitle">A homemade recipe collection</p>
          </div>
        </a>
        <nav
          class=${($: any) =>
            $.authenticated ? "auth-nav logged-in" : "auth-nav logged-out"}
          aria-label="Account"
        >
          <p class="greeting">Hello, ${($: any) => $.username || "guest"}</p>
          <menu>
            <li class="when-signed-in">
              <button>Sign out</button>
            </li>
            <li class="when-signed-out">
              <a href="/login.html">Sign in</a>
            </li>
          </menu>
        </nav>
      </div>
      <nav class="site-nav" aria-label="Sections">
        <a href="/app/recipes">Browse</a>
        <a href="/app/ingredients">Ingredients</a>
        <a href="/app/barcode">Scan</a>
        <a href="/app/saved">Saved</a>
        <a href="/app/history">History</a>
        <a href="/app/about">About</a>
      </nav>
    </header>
  `;

  static styles = css`
    :host {
      display: block;
    }
    /* Visibility helpers for the auth nav slot. */
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
      background: linear-gradient(
        180deg,
        var(--color-background-header) 0%,
        color-mix(in srgb, var(--color-background-header) 90%, black) 100%
      );
      color: var(--color-text-header);
      font-family: var(--font-sans);
      box-shadow: var(--shadow-md);
    }

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
    }

    .home-link {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      color: inherit;
      text-decoration: none;
    }
    .home-link:hover {
      color: inherit;
      text-decoration: none;
    }

    .brand-icon {
      height: 2.75em;
      width: 2.75em;
      fill: currentColor;
      flex-shrink: 0;
      transition: transform var(--duration) var(--ease);
    }
    .home-link:hover .brand-icon {
      transform: rotate(-6deg);
    }

    .header-title h1 {
      margin: 0;
      font-family: var(--font-serif);
      font-size: var(--text-lg);
      font-weight: 700;
      line-height: var(--leading-tight);
      letter-spacing: 0.2px;
    }
    .header-subtitle {
      margin: 0;
      font-size: var(--text-xs);
      letter-spacing: 0.4px;
      opacity: 0.7;
      text-transform: uppercase;
    }

    /* ---------- Auth nav (top-right) ---------- */
    .auth-nav {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--text-sm);
    }
    .greeting {
      margin: 0;
      opacity: 0.8;
      font-style: italic;
    }
    menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .auth-nav a,
    .auth-nav button {
      padding: 6px 16px;
      border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
      border-radius: var(--radius-pill);
      color: var(--color-text-header);
      background: transparent;
      text-decoration: none;
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      cursor: pointer;
      transition:
        background var(--duration-fast) var(--ease),
        color var(--duration-fast) var(--ease),
        border-color var(--duration-fast) var(--ease);
    }
    .auth-nav a:hover,
    .auth-nav button:hover {
      background: var(--color-text-header);
      color: var(--color-background-header);
      border-color: var(--color-text-header);
    }

    /* ---------- Site nav (sub-bar) ---------- */
    .site-nav {
      display: flex;
      gap: var(--space-2xs);
      padding: var(--space-sm) var(--space-lg) var(--space-md);
      border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
      overflow-x: auto;
      scrollbar-width: none;
    }
    .site-nav::-webkit-scrollbar {
      display: none;
    }
    .site-nav a {
      position: relative;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-text-header);
      text-decoration: none;
      opacity: 0.75;
      white-space: nowrap;
      transition:
        background var(--duration-fast) var(--ease),
        opacity var(--duration-fast) var(--ease),
        color var(--duration-fast) var(--ease);
    }
    .site-nav a:hover {
      background: color-mix(in srgb, currentColor 12%, transparent);
      opacity: 1;
      text-decoration: none;
      color: var(--color-text-header);
    }
    .site-nav a[aria-current="page"] {
      opacity: 1;
      color: var(--accent-warm);
    }
    .site-nav a[aria-current="page"]::after {
      content: "";
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: -3px;
      height: 2px;
      background: var(--accent-warm);
      border-radius: 2px;
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
