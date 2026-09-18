/**
 * Fullscreen Numbered Editorial Navigation Overlay Component
 */
import { siteConfig } from '../data/siteConfig.js';

export function renderMobileMenu() {
  const { brandTitle, contact } = siteConfig.photographer;
  
  const navItems = [
    { num: "01", label: "HOME", href: "#hero" },
    { num: "02", label: "STORIES", href: "#featured-stories" },
    { num: "03", label: "HEIJINGPOT", href: "#chapter-heijingpot" },
    { num: "04", label: "LUHONGBA", href: "#chapter-luhongba" },
    { num: "05", label: "CHAKOUBA", href: "#chapter-chakouba" },
    { num: "06", label: "POST WEDDING", href: "#chapter-post-wedding" },
    { num: "07", label: "PLANS", href: "#packages" },
    { num: "08", label: "ABOUT", href: "#about" },
    { num: "09", label: "CONTACT", href: "#booking" }
  ];

  return `
    <div id="mobile-menu-overlay" class="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div class="menu-header">
        <span class="meta-label text-gold">${brandTitle} • MANIPUR</span>
        <button id="menu-close-trigger" class="menu-close-btn" aria-label="Close Navigation Menu">
          <span>CLOSE ✕</span>
        </button>
      </div>

      <nav class="menu-nav" role="navigation">
        <ul class="menu-nav-list">
          ${navItems.map(item => `
            <li class="menu-nav-item">
              <a href="${item.href}" class="menu-link" data-target="${item.href}">
                <span class="menu-nav-num">${item.num}</span>
                <span class="menu-nav-label">${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>

      <div class="menu-footer">
        <div class="menu-footer-meta">
          <p>Imphal, Manipur • India</p>
          <p class="text-gold">Documenting Sacred Weddings</p>
        </div>
        <div class="menu-footer-links">
          <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/${contact.whatsappNumber}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

export function initMobileMenuEvents() {
  const overlay = document.getElementById('mobile-menu-overlay');
  const openTrigger = document.getElementById('menu-open-trigger');
  const closeTrigger = document.getElementById('menu-close-trigger');

  if (!overlay || !openTrigger) return;

  const openMenu = () => {
    overlay.classList.add('is-open');
    openTrigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    overlay.classList.remove('is-open');
    openTrigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  openTrigger.addEventListener('click', openMenu);
  if (closeTrigger) closeTrigger.addEventListener('click', closeMenu);

  overlay.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      closeMenu();
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
