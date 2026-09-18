/**
 * PerspectiveSection Component
 * "ONE WEDDING. MULTIPLE PERSPECTIVES."
 * Explains why multi-photographer/videographer coverage captures richer storytelling.
 */
import { imageConfig } from '../data/imageConfig.js';

export function renderPerspectiveSection() {
  const perspectives = imageConfig.perspectives;

  return `
    <section class="section-spacing" aria-label="One Wedding Multiple Perspectives">
      <div class="mobile-container">
        <div class="reveal-init">
          <span class="chapter-badge">SIMULTANEOUS STORYTELLING</span>
          <h2 class="section-title">ONE WEDDING.<br/>MULTIPLE PERSPECTIVES.</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="editorial-lead">
            During a sacred Manipuri ceremony, moments occur at once: while one photographer frames the sacred garland exchange at the Phambankhol, another captures the tear of blessing on a mother's cheek.
          </p>
        </div>

        <div class="perspective-grid">
          ${perspectives.map((item, idx) => `
            <div class="perspective-item reveal-init delay-${idx + 1}">
              <img 
                src="${item.src}" 
                alt="${item.label}" 
                class="chapter-frame chapter-frame--landscape" 
                loading="lazy" 
              />
              <div class="perspective-caption">
                <span class="text-gold" style="font-weight: 600;">${item.angle}: </span>
                <span style="color: var(--color-ink-primary); font-weight: 500;">${item.label}</span>
                <p style="text-transform: none; font-size: 0.8rem; margin-top: 2px;">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
