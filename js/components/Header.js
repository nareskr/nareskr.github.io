/**
 * Minimal Floating Mobile Header Component
 */
import { siteConfig } from '../data/siteConfig.js';

export function renderHeader() {
  const { brandTitle, brandSubtitle } = siteConfig.photographer;
  return `
    <header class="site-header" role="banner">
      <a href="#hero" class="brand-mark" aria-label="Home">
        <img src="assets/images/branding/logo.png" alt="${brandTitle}" class="brand-logo-img" />
        <span class="brand-subtitle">${brandSubtitle}</span>
      </a>

      <button id="menu-open-trigger" class="menu-trigger" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="mobile-menu-overlay">
        <span>MENU</span>
        <div class="menu-trigger-icon" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
      </button>
    </header>
  `;
}
