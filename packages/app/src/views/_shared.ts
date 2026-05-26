import { css } from "@unbndl/html";

/**
 * Shared styles for the simple "stub" views (history, saved, barcode,
 * ingredients).  Each one is a centered page with an eyebrow + serif
 * title + subtitle, then a friendly empty-state card with a cat icon.
 *
 * Markup contract:
 *   <header class="view-header">
 *     <p class="eyebrow">…</p>
 *     <h2>…</h2>
 *     <p class="subtitle">…</p>
 *   </header>
 *   <div class="empty-state">
 *     <svg class="empty-icon">…</svg>
 *     <p class="empty-title">…</p>
 *     <p class="empty-body">…</p>
 *   </div>
 */
export const stubViewStyles = css`
  :host {
    display: block;
    padding: var(--space-xl) var(--space-lg);
    max-width: var(--content-max);
    margin: 0 auto;
  }

  .view-header {
    margin-bottom: var(--space-xl);
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
    margin: 0;
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-base);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-2xl) var(--space-lg);
    background: var(--surface-card);
    border: 1px dashed var(--border-strong);
    border-radius: var(--radius-lg);
    text-align: center;
    box-shadow: var(--shadow-sm);
  }
  .empty-icon {
    height: 6em;
    width: 6em;
    fill: color-mix(in srgb, var(--ink) 55%, transparent);
  }
  .empty-title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    color: var(--ink-strong);
    font-weight: 700;
  }
  .empty-body {
    margin: 0;
    max-width: 36ch;
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: var(--leading-body);
  }
`;
