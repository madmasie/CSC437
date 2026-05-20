import { css, html, shadow } from "@unbndl/html";

export class AboutViewElement extends HTMLElement {
  static template = html`<template>
    <div class="about-container">
      <h2>About Me</h2>
      <img src="/images/maddie.jpg" alt="Photo of Maddie" class="about-photo" />
      <p class="about-bio">
        Fun facts about me coming soon! Check back later to learn more about the person behind these recipes.
      </p>
      <ul class="social-buttons">
        <li><a href="https://www.instagram.com/maddiemasiello" target="_blank" rel="noopener noreferrer" class="social-btn"><span>Instagram</span></a></li>
        <li><a href="https://www.instagram.com/matchawithmaddie" target="_blank" rel="noopener noreferrer" class="social-btn"><span>Matcha Reviews Instagram</span></a></li>
      </ul>
    </div>
  </template>`;

  static styles = css`
    .about-container { display: flex; flex-direction: column; align-items: center; gap: var(--space-lg); max-width: 600px; margin: 0 auto; padding: var(--space-lg); text-align: center; }
    h2 { font-size: 2rem; color: var(--color-coral); }
    .about-photo { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-accent); }
    .about-bio { font-size: 16px; line-height: 1.7; }
    .social-buttons { display: flex; flex-direction: column; gap: var(--space-sm); width: 100%; max-width: 320px; list-style: none; padding: 0; margin: 0; }
    .social-btn { display: flex; align-items: center; gap: var(--space-sm); padding: 10px 22px; border: 2px solid var(--color-text); border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500; color: var(--color-text); text-decoration: none; transition: background 0.15s, color 0.15s; }
    .social-btn:hover { background: var(--color-text); color: var(--color-background-page); }
  `;

  constructor() {
    super();
    shadow(this).template(AboutViewElement.template).styles(AboutViewElement.styles);
  }
}
