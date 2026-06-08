import { css, html, shadow } from "@unbndl/html";

export class AboutViewElement extends HTMLElement {
  static template = html`<template>
    <article class="about">
      <header class="view-header">
        <p class="eyebrow">Hello</p>
        <h2>About Me</h2>
      </header>

      <img src="/images/maddie.jpg" alt="Photo of Maddie" class="about-photo" />

      <p class="about-bio">
        Hi, I'm Maddie! I'm graduating from Cal Poly SLO with a major in
        Electrical Engineering and a minor in Computer Science. Throughout
        college, I've slowly learned to cook, and these are some of the recipes
        I've made a lot throughout my 5 years at Cal Poly. This website is a
        work in progress, as there are a lot of features I have not fully
        implemented yet.
      </p>

      <ul class="social-buttons">
        <li>
          <a
            href="https://www.instagram.com/maddiemasiello"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
              />
            </svg>
            <span>@maddiemasiello</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/matchawithmaddie"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
              />
            </svg>
            <span>@matchawithmaddie</span>
          </a>
        </li>
        <li>
          <a href="mailto:maddie@example.com" class="social-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2-8 5-8-5h16zm0 12H4V8.236l8 5 8-5V18z"
              />
            </svg>
            <span>Email me</span>
          </a>
        </li>
      </ul>
    </article>
  </template>`;

  static styles = css`
    :host {
      display: block;
      padding: var(--space-xl) var(--space-lg);
    }
    .about {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      max-width: 520px;
      margin: 0 auto;
      text-align: center;
    }

    .view-header {
      text-align: center;
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
      margin: 0;
      font-family: var(--font-serif);
      font-size: var(--text-2xl);
      color: var(--ink-strong);
    }

    .about-photo {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--surface-card);
      box-shadow:
        0 0 0 2px var(--accent),
        var(--shadow-md);
    }

    .about-bio {
      margin: 0;
      font-family: var(--font-serif);
      font-size: var(--text-md);
      line-height: var(--leading-body);
      color: var(--ink);
      max-width: 44ch;
    }

    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      width: 100%;
      max-width: 320px;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .social-btn {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 10px 18px;
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--ink);
      text-decoration: none;
      box-shadow: var(--shadow-sm);
      transition:
        background var(--duration-fast) var(--ease),
        color var(--duration-fast) var(--ease),
        border-color var(--duration-fast) var(--ease),
        transform var(--duration-fast) var(--ease);
    }
    .social-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      fill: currentColor;
    }
    .social-btn:hover {
      background: var(--accent);
      color: var(--ink-on-accent);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(AboutViewElement.template)
      .styles(AboutViewElement.styles);
  }
}
