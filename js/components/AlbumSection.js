/**
 * AlbumSection Component
 * "THE PHOTOGRAPHS SHOULD LIVE BEYOND THE SCREEN."
 * Showcases the heirloom physical album deliverable and process pipeline.
 */
import { siteConfig } from '../data/siteConfig.js';
import { imageConfig } from '../data/imageConfig.js';

export function renderAlbumSection() {
  const { heading, subheading, quote } = siteConfig.albumSection;
  const spread = imageConfig.albumSpreads[0];

  const processSteps = [
    { num: "01", name: "CAPTURED", desc: "Observational documentation of sacred rituals and authentic emotion." },
    { num: "02", name: "EDITED", desc: "Meticulous color grading honoring true skin tones and handloom silks." },
    { num: "03", name: "DESIGNED", desc: "Bespoke narrative sequencing creating timeless page spreads." },
    { num: "04", name: "PRINTED", desc: "Archival fine art museum paper that never fades over generations." },
    { num: "05", name: "KEPT", desc: "An heirloom piece held in your hands and passed down through family." }
  ];

  return `
    <section id="album" class="section-spacing--lg" style="background-color: var(--color-bg-primary);" aria-label="Fine Art Printed Albums">
      <div class="mobile-container">
        <div class="reveal-init text-center">
          <span class="chapter-badge">TANGIBLE PRESERVATION</span>
          <h2 class="section-title" style="max-width: 22ch; margin: 0 auto;">${heading}</h2>
          <div class="section-divider"></div>
          <p class="editorial-quote" style="color: var(--color-accent-gold); margin-top: 12px;">${subheading}</p>
        </div>

        <!-- Album Spread Mockup -->
        <div class="album-spread-preview reveal-scale-init delay-1">
          <div class="album-spread-inner">
            <div class="album-half-page">
              <img src="${spread.leftImg}" alt="Album Left Page Spread" class="album-half-img" loading="lazy" />
            </div>
            <div class="album-page-gutter"></div>
            <div class="album-half-page">
              <img src="${spread.rightImg}" alt="Album Right Page Spread" class="album-half-img" loading="lazy" />
            </div>
          </div>
          <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: baseline; font-size: 0.8rem; color: var(--color-ink-muted);">
            <span class="text-gold" style="font-weight: 600;">${spread.title}</span>
            <span>${spread.desc}</span>
          </div>
        </div>

        <!-- Process Pipeline (Captured -> Kept) -->
        <div style="margin-top: var(--space-2xl);">
          <div class="reveal-init" style="margin-bottom: var(--space-md);">
            <span class="meta-label">THE ARTISANAL JOURNEY</span>
          </div>

          <div class="process-steps">
            ${processSteps.map((step, idx) => `
              <div class="process-step-item reveal-init delay-${idx + 1}">
                <span class="process-step-num">${step.num}</span>
                <div>
                  <h4 class="process-step-name">${step.name}</h4>
                  <p style="font-size: 0.8rem; color: var(--color-ink-secondary); margin-top: 2px;">${step.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}
