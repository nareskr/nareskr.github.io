/**
 * Opening Hero Component
 * Cinematic portrait opening with restrained entrance and scroll prompt.
 */
import { siteConfig } from '../data/siteConfig.js';
import { imageConfig } from '../data/imageConfig.js';

export function renderHero() {
  const { supertitle, title, tagline, scrollText } = siteConfig.hero;
  const heroImage = imageConfig.hero;

  return `
    <section id="hero" class="hero-section" aria-label="Hero Introduction">
      <div class="hero-background">
        <picture>
          <source srcset="${heroImage.src}" type="image/jpeg">
          <img 
            src="${heroImage.src}" 
            alt="${heroImage.alt}" 
            class="hero-bg-img hero-animate-image"
            fetchpriority="high"
            loading="eager"
            width="1600"
            height="1067"
          />
        </picture>
        <div class="hero-scrim" aria-hidden="true"></div>
      </div>

      <div class="hero-content">
        <div class="hero-animate-text">
          <span class="chapter-badge">${supertitle}</span>
          <h1 class="hero-title">
            <span>${title}</span>
          </h1>
          <p class="hero-tagline">${tagline}</p>
        </div>

        <div class="hero-scroll-indicator hero-animate-scroll">
          <div class="scroll-line" aria-hidden="true"></div>
          <span>${scrollText}</span>
        </div>
      </div>
    </section>
  `;
}
