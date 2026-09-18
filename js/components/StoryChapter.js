/**
 * StoryChapter Component
 * Renders individual narrative chapters with alternate portrait/landscape framing and quiet captions.
 */
export function renderStoryChapter({
  id,
  number,
  title,
  subtitle,
  description,
  photos = [],
  customLayout = "standard"
}) {
  const primaryPhoto = photos[0];
  const secondaryPhotos = photos.slice(1);

  return `
    <section id="chapter-${id}" class="chapter-container section-spacing" aria-label="Chapter ${number}: ${title}">
      <div class="mobile-container">
        <div class="chapter-header reveal-init">
          <div class="chapter-number">${number}</div>
          <span class="chapter-badge">CHAPTER ${number}</span>
          <h2 class="chapter-heading">${title}</h2>
          <p class="chapter-subtext editorial-quote">${subtitle}</p>
          ${description ? `<p class="editorial-lead" style="margin-top: 12px; font-size: 0.88rem;">${description}</p>` : ''}
        </div>

        ${primaryPhoto ? `
          <div class="chapter-frame chapter-frame--landscape chapter-media-wrap reveal-scale-init">
            <img 
              src="${primaryPhoto.src}" 
              alt="${primaryPhoto.alt}" 
              class="chapter-image-zoom"
              loading="lazy"
              width="1600"
              height="1067"
            />
          </div>
          ${primaryPhoto.caption ? `
            <div class="chapter-caption reveal-init delay-1">
              <span>${primaryPhoto.caption}</span>
              <span class="meta-label">MANIPUR</span>
            </div>
          ` : ''}
        ` : ''}

        ${secondaryPhotos.length > 0 ? `
          <div style="margin-top: var(--space-2xl); display: flex; flex-direction: column; gap: var(--space-xl);">
            ${secondaryPhotos.map((photo, idx) => `
              <div class="reveal-init delay-${idx + 1}">
                <div class="chapter-frame chapter-frame--landscape chapter-media-wrap">
                  <img 
                    src="${photo.src}" 
                    alt="${photo.alt}" 
                    class="chapter-image-zoom"
                    loading="lazy"
                    width="1600"
                    height="1067"
                  />
                </div>
                ${photo.caption ? `
                  <div class="chapter-caption">
                    <span>${photo.caption}</span>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
