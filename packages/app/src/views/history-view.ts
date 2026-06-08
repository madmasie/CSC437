import { getHistory, HistoryEntry } from "../history.ts";

const styles = `
  :host {
    display: block;
    padding: var(--space-xl) var(--space-lg);
    max-width: var(--content-max);
    margin: 0 auto;
  }
  .eyebrow {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 var(--space-xs);
  }
  h2 {
    margin: 0 0 var(--space-xs);
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    color: var(--ink-strong);
  }
  .subtitle {
    margin: 0 0 var(--space-xl);
    color: var(--ink-muted);
    font-family: var(--font-sans);
  }
  .history-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .history-item a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background: var(--surface-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--ink);
    font-family: var(--font-sans);
    transition: background var(--duration-fast) var(--ease);
  }
  .history-item a:hover { background: var(--surface-sunken); }
  .history-title { font-weight: 600; color: var(--ink-strong); }
  .history-time { font-size: var(--text-xs); color: var(--ink-muted); }
  .empty {
    text-align: center;
    padding: var(--space-2xl);
    color: var(--ink-muted);
    font-family: var(--font-sans);
  }
`;

export class HistoryViewElement extends HTMLElement {
  connectedCallback() {
    const sr = this.attachShadow({ mode: "open" });
    const history = getHistory();

    const items = history.length
      ? `<ul class="history-list">${history
          .map(
            (e: HistoryEntry) =>
              `<li class="history-item"><a href="/app/recipe/${e.id}">
                <span class="history-title">${e.title}</span>
                <span class="history-time">${new Date(e.viewedAt).toLocaleDateString()}</span>
              </a></li>`
          )
          .join("")}</ul>`
      : `<div class="empty">Recipes you view will appear here.</div>`;

    sr.innerHTML = `<style>${styles}</style>
      <p class="eyebrow">Activity</p>
      <h2>History</h2>
      <p class="subtitle">Recipes you've recently viewed.</p>
      ${items}`;
  }
}
