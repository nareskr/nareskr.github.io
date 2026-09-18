/**
 * The People Component
 * Emotional observational storytelling: Bride, Groom, Parents, Family, and Candid Expressions.
 */
import { imageConfig } from '../data/imageConfig.js';

export function renderPeopleSection() {
  const people = imageConfig.people;

  return `
    <section id="people" class="section-spacing" style="background-color: var(--color-bg-secondary);" aria-label="The People and Emotions">
      <div class="mobile-container">
        <div class="reveal-init">
          <span class="chapter-badge">OBSERVATIONAL STORYTELLING</span>
          <h2 class="section-title">THE PEOPLE</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="editorial-quote" style="margin-top: 12px; margin-bottom: var(--space-lg);">
            "Beyond the sacred rituals live the quiet glances, tears of blessing, and shared laughter between generations."
          </p>
        </div>

        <div class="people-grid">
          ${people.map((item, idx) => `
            <div class="people-card reveal-scale-init delay-${idx + 1}">
              <img 
                src="${item.src}" 
                alt="${item.role}" 
                class="people-card-img"
                loading="lazy"
                width="1600"
                height="1067"
              />
              <div class="people-card-meta">
                <span class="meta-label text-gold">${item.role}</span>
                <span style="font-size: 0.82rem; color: var(--color-ink-muted);">${item.caption}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
