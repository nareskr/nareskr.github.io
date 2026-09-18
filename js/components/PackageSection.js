/**
 * PackageSection Component
 * Three editorial plans (Essential, Signature, Legacy) presented with quiet luxury hierarchy.
 */
import { packageData } from '../data/packageData.js';

export function renderPackageSection() {
  const { plans } = packageData;

  return `
    <section id="packages" class="packages-section section-spacing" aria-label="Curated Wedding Collections">
      <div class="mobile-container">
        <div class="reveal-init">
          <span class="chapter-badge">COLLECTIONS</span>
          <h2 class="section-title">THREE WAYS TO PRESERVE YOUR STORY</h2>
          <div class="section-divider section-divider--left"></div>
          <p class="editorial-lead">
            Tailored documentation levels designed to honor the scale, intimacy, and ritual depth of your wedding.
          </p>
        </div>

        <div style="margin-top: var(--space-2xl);">
          ${plans.map((plan, idx) => `
            <div class="plan-card ${plan.featured ? 'plan-card--featured' : ''} reveal-init delay-${idx + 1}">
              ${plan.featured ? `<div class="plan-featured-badge">MOST REQUESTED</div>` : ''}
              
              <div class="plan-number">COLLECTION ${plan.planNumber}</div>
              <h3 class="plan-name">${plan.name}</h3>
              <p class="plan-tagline">"${plan.tagline}"</p>
              
              <ul class="plan-specs-list">
                <li class="plan-spec-item">
                  <span class="plan-spec-label">Photography</span>
                  <span class="plan-spec-val">${plan.specs.photographers}</span>
                </li>
                <li class="plan-spec-item">
                  <span class="plan-spec-label">Videography</span>
                  <span class="plan-spec-val">${plan.specs.videographers}</span>
                </li>
                <li class="plan-spec-item">
                  <span class="plan-spec-label">Curated Images</span>
                  <span class="plan-spec-val">${plan.specs.editedPhotos}</span>
                </li>
                <li class="plan-spec-item">
                  <span class="plan-spec-label">Heirloom Album</span>
                  <span class="plan-spec-val">${plan.specs.album}</span>
                </li>
              </ul>

              <button class="plan-detail-trigger" data-plan-id="${plan.id}" aria-label="View Details for ${plan.name} Collection">
                <span>VIEW COMPLETE DETAILS</span>
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
