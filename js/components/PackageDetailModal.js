/**
 * PackageDetailModal Component
 * Interactive slide-over sheet showing comprehensive package deliverables, coverage, and booking link.
 */
import { packageData } from '../data/packageData.js';

export function renderPackageDetailModalMarkup() {
  return `
    <div id="package-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Package Details">
      <div class="modal-sheet" id="package-modal-sheet">
        <div id="package-modal-content">
          <!-- Dynamically populated via initPackageModalEvents -->
        </div>
      </div>
    </div>
  `;
}

export function initPackageModalEvents() {
  const backdrop = document.getElementById('package-modal-backdrop');
  const content = document.getElementById('package-modal-content');
  if (!backdrop || !content) return;

  document.querySelectorAll('.plan-detail-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const planId = btn.getAttribute('data-plan-id');
      const plan = packageData.plans.find(p => p.id === planId);
      if (!plan) return;

      content.innerHTML = `
        <div class="modal-header">
          <div>
            <span class="chapter-badge">COLLECTION ${plan.planNumber}</span>
            <h3 class="font-serif" style="font-size: 1.8rem; text-transform: uppercase;">${plan.name}</h3>
            <p class="plan-tagline" style="margin-bottom: 0;">"${plan.tagline}"</p>
          </div>
          <button id="modal-close-trigger" class="modal-close-btn" aria-label="Close Package Details">✕ CLOSE</button>
        </div>

        <p class="editorial-lead" style="font-size: 0.9rem; margin-bottom: var(--space-lg);">${plan.summary}</p>

        <!-- Technical Specs Breakdown -->
        <div style="margin-bottom: var(--space-lg);">
          <span class="meta-label text-gold">DOCUMENTATION TEAM</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem;">
            <div>• <strong>Photography:</strong> ${plan.specs.photographers}</div>
            <div>• <strong>Videography:</strong> ${plan.specs.videographers}</div>
            <div>• <strong>Curated Deliverables:</strong> ${plan.specs.editedPhotos}</div>
            <div>• <strong>Heirloom Album:</strong> ${plan.specs.album}</div>
          </div>
        </div>

        <!-- Event Coverage -->
        <div style="margin-bottom: var(--space-lg);">
          <span class="meta-label text-gold">CEREMONIAL COVERAGE</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            ${plan.eventsCovered.map(ev => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; border-bottom: var(--border-hairline); padding-bottom: 6px;">
                <span style="font-weight: 500;">${ev.name}</span>
                <span style="color: ${ev.included ? 'var(--color-accent-gold)' : 'var(--color-ink-muted)'}; font-size: 0.78rem;">
                  ${ev.included ? '✓ Included' : 'Optional Add-on'}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Deliverables -->
        <div style="margin-bottom: var(--space-xl);">
          <span class="meta-label text-gold">DELIVERABLES & HEIRLOOMS</span>
          <ul style="margin-top: 8px; padding-left: 18px; font-size: 0.85rem; color: var(--color-ink-secondary); display: flex; flex-direction: column; gap: 4px;">
            ${plan.deliverables.map(del => `<li>${del}</li>`).join('')}
          </ul>
        </div>

        <div style="border-top: var(--border-hairline); padding-top: var(--space-md);">
          <button id="select-plan-cta" class="btn-primary" data-plan-name="${plan.name}">
            CHECK AVAILABILITY FOR ${plan.name}
          </button>
        </div>
      `;

      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Attach close button
      const closeBtn = document.getElementById('modal-close-trigger');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      // Attach Select Plan CTA
      const selectCta = document.getElementById('select-plan-cta');
      if (selectCta) {
        selectCta.addEventListener('click', () => {
          closeModal();
          const pkgSelect = document.getElementById('preferredPackage');
          if (pkgSelect) {
            pkgSelect.value = plan.name;
          }
          const bookingEl = document.getElementById('booking');
          if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  });

  const closeModal = () => {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}
