/**
 * Footer Component
 * Minimal editorial footer.
 */
import { siteConfig } from '../data/siteConfig.js';

export function renderFooter() {
  const { brandTitle, specialization, contact, location } = siteConfig.photographer;
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer" role="contentinfo">
      <div class="mobile-container">
        <div class="footer-brand">
          <span class="brand-name font-serif" style="font-size: 1.4rem; color: #FAF8F5;">${brandTitle}</span>
          <p class="meta-label text-gold" style="margin-top: 4px;">${specialization}</p>
          <p style="font-size: 0.8rem; color: var(--color-ink-inverted-muted); margin-top: 2px;">${location}</p>
        </div>

        <div class="footer-links">
          <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/${contact.whatsappNumber}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:${contact.email}">Email</a>
        </div>

        <p class="footer-copy">
          © ${currentYear} ${brandTitle} Wedding Photography. All rights reserved.<br/>
          Crafted with reverence for Manipuri visual culture.
        </p>
      </div>
    </footer>
  `;
}
