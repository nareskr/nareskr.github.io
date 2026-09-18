/**
 * About Component
 * Personal, culturally respectful introduction of the photographer.
 */
import { siteConfig } from '../data/siteConfig.js';

export function renderAbout() {
  const { name, specialization, location, bioApproach } = siteConfig.photographer;

  return `
    <section id="about" class="section-spacing" style="background-color: var(--color-bg-secondary);" aria-label="About the Photographer">
      <div class="mobile-container">
        <div class="reveal-init">
          <span class="chapter-badge">THE ARTIST</span>
          <h2 class="section-title">ABOUT ${name.toUpperCase()}</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="meta-label text-gold" style="margin-top: 8px;">${specialization} • ${location}</p>
        </div>

        <div class="reveal-init delay-1" style="margin-top: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-md); font-size: 0.95rem; line-height: 1.75; color: var(--color-ink-secondary);">
          <p>
            Born and based in Manipur, I specialize exclusively in documenting traditional Meitei and Manipuri weddings.
          </p>
          <p>
            To document a Manipuri wedding is to understand its rhythm: the reverence of the <em>Heijingpot</em>, the sacred stillness surrounding the <em>Phambankhol</em> during <em>Luhongba</em>, and the boundless joy of <em>Chakouba</em> where families celebrate generations of union.
          </p>
          <p class="editorial-quote" style="color: var(--color-ink-primary); padding-left: 16px; border-left: 2px solid var(--color-accent-gold); margin: var(--space-sm) 0;">
            "${bioApproach}"
          </p>
        </div>
      </div>
    </section>
  `;
}
