/**
 * FeaturedStories Component
 * Curated editorial wedding stories with interactive narrative modal.
 */
import { storyData } from '../data/storyData.js';

export function renderFeaturedStories() {
  return `
    <section id="featured-stories" class="section-spacing" aria-label="Featured Wedding Stories">
      <div class="mobile-container">
        <div class="reveal-init" style="margin-bottom: var(--space-xl);">
          <span class="chapter-badge">SELECTED ARCHIVES</span>
          <h2 class="section-title">FEATURED STORIES</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="editorial-lead">Complete visual narratives documenting the rituals, quiet glances, and celebrations across Manipur.</p>
        </div>

        <div class="stories-list">
          ${storyData.map((story, index) => `
            <article class="story-card reveal-init delay-${index + 1}">
              <img 
                src="${story.coverImage}" 
                alt="${story.title}" 
                class="story-card-image"
                loading="lazy"
              />
              <div class="story-card-content">
                <div class="story-card-category">${story.category}</div>
                <h3 class="story-card-title">${story.title}</h3>
                <p class="story-card-desc">${story.description}</p>
                
                <button class="story-enter-btn" data-story-id="${story.id}">
                  <span>ENTER STORY</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initStoryModalEvents() {
  document.querySelectorAll('.story-enter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const storyId = btn.getAttribute('data-story-id');
      const story = storyData.find(s => s.id === storyId);
      if (!story) return;

      const modalBackdrop = document.getElementById('story-modal-backdrop');
      const modalContent = document.getElementById('story-modal-content');
      if (!modalBackdrop || !modalContent) return;

      modalContent.innerHTML = `
        <div class="modal-header">
          <div>
            <span class="chapter-badge">${story.category}</span>
            <h3 class="font-serif" style="font-size: 1.5rem; text-transform: uppercase;">${story.title}</h3>
            <p class="meta-label text-muted" style="margin-top: 4px;">${story.location}</p>
          </div>
          <button id="story-modal-close-btn" class="modal-close-btn">✕ CLOSE</button>
        </div>

        <p class="editorial-lead" style="margin-bottom: var(--space-xl);">${story.description}</p>

        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <img src="${story.coverImage}" alt="${story.title} Cover" style="width: 100%; aspect-ratio: 3/2; object-fit: cover;" />
          ${story.highlightImages.map(img => `
            <img src="${img}" alt="${story.title} Narrative Frame" style="width: 100%; aspect-ratio: 3/2; object-fit: cover;" loading="lazy" />
          `).join('')}
        </div>
      `;

      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      const closeBtn = document.getElementById('story-modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modalBackdrop.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      }
    });
  });

  const modalBackdrop = document.getElementById('story-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
}
