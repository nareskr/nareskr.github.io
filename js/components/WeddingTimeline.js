/**
 * WeddingTimeline Component
 * Visual 4-stage ceremonial narrative timeline.
 */
import { siteConfig } from '../data/siteConfig.js';

export function renderWeddingTimeline() {
  const { chapters } = siteConfig;

  return `
    <section class="section-spacing" aria-label="Ceremonial Timeline">
      <div class="mobile-container">
        <div class="reveal-init">
          <span class="chapter-badge">THE JOURNEY</span>
          <h2 class="section-title">WEDDING COVERAGE TIMELINE</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="editorial-lead">A Manipuri wedding is an unfolding story across sacred spaces and multi-generational reunions.</p>
        </div>

        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          
          ${chapters.map((ch, idx) => `
            <div class="timeline-step reveal-init delay-${idx + 1}">
              <div class="timeline-dot"></div>
              <span class="meta-label text-gold">STAGE ${ch.number}</span>
              <h3 class="timeline-step-title">${ch.title}</h3>
              <p class="timeline-step-desc">${ch.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
