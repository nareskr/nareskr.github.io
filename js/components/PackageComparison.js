/**
 * PackageComparison Component
 * Secondary structured matrix for visitors seeking side-by-side technical details.
 */
import { packageData } from '../data/packageData.js';

export function renderPackageComparison() {
  const { comparisonMatrix } = packageData;

  return `
    <div class="mobile-container section-spacing" style="padding-top: 0;">
      <div class="reveal-init" style="margin-bottom: var(--space-lg);">
        <span class="chapter-badge">TECHNICAL COMPARISON</span>
        <h3 class="section-title" style="font-size: 1.2rem;">SIDE-BY-SIDE MATRIX</h3>
      </div>

      <div class="reveal-init delay-1" style="overflow-x: auto; -webkit-overflow-scrolling: touch; border: var(--border-hairline); background-color: var(--color-bg-surface); padding: var(--space-md); border-radius: var(--radius-xs);">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-accent-gold); font-family: var(--font-serif); text-transform: uppercase;">
              <th style="padding: 8px 4px;">Features</th>
              <th style="padding: 8px 4px; text-align: center;">Essential</th>
              <th style="padding: 8px 4px; text-align: center; color: var(--color-accent-gold);">Signature</th>
              <th style="padding: 8px 4px; text-align: center;">Legacy</th>
            </tr>
          </thead>
          <tbody>
            ${comparisonMatrix.map(row => `
              <tr style="border-bottom: var(--border-hairline);">
                <td style="padding: 8px 4px; font-weight: 500; color: var(--color-ink-primary);">${row.feature}</td>
                <td style="padding: 8px 4px; text-align: center; color: var(--color-ink-secondary);">${row.plan1}</td>
                <td style="padding: 8px 4px; text-align: center; font-weight: 600; color: var(--color-accent-gold);">${row.plan2}</td>
                <td style="padding: 8px 4px; text-align: center; color: var(--color-ink-secondary);">${row.plan3}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
