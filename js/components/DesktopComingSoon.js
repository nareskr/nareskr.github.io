/**
 * DesktopComingSoon (Desktop Split-Screen Experience) Component
 * Split-screen luxury layout for desktop viewports (>= 768px):
 * - Left: Editorial narrative, brand typography, direct booking, and colophon
 * - Right: Interactive smartphone mockup hosting the live wedding monograph
 */
import { siteConfig } from '../data/siteConfig.js';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp.js';

export function renderDesktopComingSoon() {
  const { brandTitle, brandSubtitle, location, contact } = siteConfig.photographer;
  const { developer } = siteConfig;

  return `
    <div class="desktop-split-wrapper" id="desktop-split-wrapper">
      <!-- Left Column: Editorial Brand & Storytelling -->
      <aside class="desktop-editorial-col">
        <!-- Top Brand Lockup with Official Logo -->
        <header class="desktop-editorial-header">
          <div class="desktop-editorial-brand">
            <img src="assets/images/branding/logo.png" alt="${brandTitle}" class="desktop-editorial-logo" />
            <span class="desktop-editorial-sub">${brandSubtitle}</span>
          </div>
          <div class="desktop-studio-loc">${location}</div>
        </header>

        <!-- Center Editorial Narrative -->
        <main class="desktop-editorial-body">
          <div class="desktop-editorial-rituals">
            <span>HEIJINGPOT</span>
            <span class="dot">•</span>
            <span>LUHONGBA</span>
            <span class="dot">•</span>
            <span>CHAKOUBA</span>
          </div>

          <h1 class="desktop-editorial-heading">
            Sacred Rituals.<br>
            Quiet Luxury.<br>
            <span class="heading-italic">Told Through Photographs.</span>
          </h1>

          <p class="desktop-editorial-lead">
            An observational wedding monograph documenting the sacred moments between rituals — the fragrance of Lei-Chandan, the quiet emotion of the bride, the laughter of family, and heirloom fine art albums designed to preserve love across generations.
          </p>

          <!-- Interactive Device Navigation Guide -->
          <div class="desktop-interactive-guide">
            <span class="guide-scroll-icon" aria-hidden="true">↓</span>
            <span>SCROLL WHEEL OR USE ARROW KEYS ↑ ↓ TO BROWSE</span>
          </div>

          <!-- Direct Actions -->
          <div class="desktop-editorial-actions">
            <a href="${getGeneralWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="desktop-whatsapp-cta">
              <span>ENQUIRE DATES ON WHATSAPP</span>
              <span aria-hidden="true">→</span>
            </a>

            <div class="desktop-editorial-meta">
              <a href="tel:+${contact.whatsappNumber}" class="desktop-meta-item">
                CALL: ${contact.whatsappDisplay}
              </a>
              <span class="dot">•</span>
              <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer" class="desktop-meta-item">
                ${contact.instagramHandle}
              </a>
            </div>
          </div>
        </main>

        <!-- Colophon & Maintainer Imprint Footer -->
        <footer class="desktop-editorial-footer">
          <div class="desktop-colophon-row">
            <span>PHOTOGRAPHY BY NARES KR • MANIPUR</span>
            <span class="dot">•</span>
            <a href="${developer.url}" target="_blank" rel="noopener noreferrer" class="desktop-dev-link">
              CRAFTED & MAINTAINED BY ${developer.name.toUpperCase()} ↗
            </a>
          </div>
        </footer>
      </aside>

      <!-- Right Column: Interactive Smartphone Mockup -->
      <section class="desktop-mockup-col" aria-label="Interactive Mobile Monograph">
        <div class="desktop-ambient-backlight" aria-hidden="true"></div>

        <div class="iphone-mockup" id="desktop-iphone-frame">
          <!-- Hardware Buttons -->
          <div class="iphone-btn iphone-btn-vol-up" aria-hidden="true"></div>
          <div class="iphone-btn iphone-btn-vol-down" aria-hidden="true"></div>
          <div class="iphone-btn iphone-btn-power" aria-hidden="true"></div>

          <!-- Phone Screen Container -->
          <div class="iphone-screen">
            <!-- Hardware Dynamic Island -->
            <div class="iphone-dynamic-island" aria-hidden="true">
              <div class="island-camera"></div>
              <div class="island-sensor"></div>
            </div>

            <!-- Subtle Glass Reflection Overlay -->
            <div class="iphone-glass-reflection" aria-hidden="true"></div>

            <!-- Live CinematicAlbum Mount Target -->
            <div id="desktop-phone-screen" class="iphone-screen-mount" role="region" aria-label="Mobile Monograph Screen">
              <!-- CinematicAlbum mounts here -->
            </div>
          </div>
        </div>

        <!-- Floating Desktop Step Navigator Controls -->
        <div class="desktop-floating-nav">
          <button id="desktop-nav-prev" class="desktop-nav-btn" aria-label="Previous Slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
          <div class="desktop-nav-counter">
            <span id="desktop-current-slide">01</span>
            <span style="opacity: 0.4;">/</span>
            <span id="desktop-total-slides">13</span>
          </div>
          <button id="desktop-nav-next" class="desktop-nav-btn" aria-label="Next Slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  `;
}

export function initDesktopSimulatorEvents(albumInstance) {
  if (!albumInstance) return;

  const prevBtn = document.getElementById('desktop-nav-prev');
  const nextBtn = document.getElementById('desktop-nav-next');
  const currentNumEl = document.getElementById('desktop-current-slide');
  const totalNumEl = document.getElementById('desktop-total-slides');

  if (totalNumEl && albumInstance.slides) {
    totalNumEl.textContent = String(albumInstance.slides.length).padStart(2, '0');
  }

  const updateCounter = () => {
    if (currentNumEl) {
      currentNumEl.textContent = String(albumInstance.currentIndex + 1).padStart(2, '0');
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      albumInstance.prev();
      updateCounter();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      albumInstance.next();
      updateCounter();
    });
  }

  // Mouse wheel anywhere on the desktop window navigates the slides inside the phone
  let isWheelThrottled = false;
  window.addEventListener('wheel', (e) => {
    if (isWheelThrottled || albumInstance.isTransitioning) return;
    
    if (Math.abs(e.deltaY) > 20) {
      isWheelThrottled = true;
      if (e.deltaY > 0) {
        albumInstance.next();
      } else {
        albumInstance.prev();
      }
      updateCounter();

      setTimeout(() => {
        isWheelThrottled = false;
      }, 350);
    }
  }, { passive: true });

  // Hook into album's HUD update to keep desktop counter synchronized
  const originalUpdateHUD = albumInstance.updateHUD.bind(albumInstance);
  albumInstance.updateHUD = function() {
    originalUpdateHUD();
    updateCounter();
  };
}
