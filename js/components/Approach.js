/**
 * My Approach Component
 * Articulates the photographer's philosophy and provides a space for the portrait frame.
 */
import { siteConfig } from '../data/siteConfig.js';
import { createMediaPlaceholder } from './MediaPlaceholder.js';

export function renderApproach() {
  const { bioApproach, name } = siteConfig.photographer;

  return `
    <section id="approach" class="section-spacing--lg" aria-label="Photographer Philosophy and Approach">
      <div class="mobile-container">
        <div class="reveal-init text-center">
          <span class="chapter-badge">PHILOSOPHY</span>
          <h2 class="section-title">MY APPROACH</h2>
          <div class="section-divider"></div>
        </div>

        <div class="reveal-init delay-1" style="margin-top: var(--space-xl); margin-bottom: var(--space-2xl);">
          <p class="editorial-quote text-center" style="max-width: 28ch; margin: 0 auto;">
            "${bioApproach}"
          </p>
        </div>

        <!-- Photographer Portrait Frame (Using intentional placeholder until final studio headshot is provided) -->
        <div class="reveal-scale-init delay-2">
          ${createMediaPlaceholder({
            type: "portrait",
            aspectRatio: "portrait",
            label: `PORTRAIT OF ${name.toUpperCase()}`,
            hint: "Lead Photographer • Manipur"
          })}
        </div>
      </div>
    </section>
  `;
}
