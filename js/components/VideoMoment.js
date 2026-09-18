/**
 * VideoMoment Component (Moving Photography)
 * Signature "Photo -> Moving Photography -> Photo" interaction.
 */
import { createMediaPlaceholder } from './MediaPlaceholder.js';

export function renderVideoMoment({
  id,
  title,
  poster,
  stillSrc,
  videoSrc = null,
  aspectRatio = "3/2",
  caption = "Moving Photography — A fleeting ritual moment brought to life."
}) {
  return `
    <div class="mobile-container section-spacing" style="padding-top: var(--space-xl); padding-bottom: var(--space-xl);">
      <div class="reveal-init" style="margin-bottom: var(--space-sm);">
        <span class="chapter-badge">MOVING PHOTOGRAPHY</span>
        <h3 class="section-title" style="font-size: 1.25rem;">${title}</h3>
      </div>

      <div class="chapter-frame chapter-frame--landscape photo-video-container reveal-scale-init" id="${id}-wrap">
        <img 
          src="${stillSrc}" 
          alt="${title} — Still capture" 
          class="pvm-still"
          loading="lazy"
        />

        ${videoSrc ? `
          <video 
            class="pvm-video" 
            poster="${poster}" 
            playsinline 
            muted 
            loop 
            preload="none"
            data-viewport-control="true"
            data-autoplay="true"
            aria-label="${title}"
          >
            <source src="${videoSrc}" type="video/mp4">
          </video>
        ` : `
          <!-- Elegant placeholder overlay until web-optimized video clip is provided -->
          <div class="pvm-video" style="display: flex; align-items: center; justify-content: center; background: rgba(20, 19, 17, 0.85); color: var(--color-ink-inverted);">
            <div style="text-align: center; padding: 20px;">
              <span class="meta-label text-gold">CINEMATIC CLIP COMING SOON</span>
              <p style="font-family: var(--font-serif); font-style: italic; font-size: 1.1rem; margin-top: 6px;">"The photograph comes alive in gentle motion."</p>
            </div>
          </div>
        `}
      </div>

      <div class="chapter-caption reveal-init delay-1">
        <span>${caption}</span>
        <span class="meta-label">MOTION</span>
      </div>
    </div>
  `;
}
