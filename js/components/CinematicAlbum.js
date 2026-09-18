/**
 * CinematicAlbum Component (The Cinematic Dissolve Monograph)
 * Full-viewport, one-moment-per-page monograph with pure crossfade transitions.
 * Pure minimal top HUD, direct WhatsApp integration with package auto-fill.
 * 13 Curated Slides:
 *   01 - Heijingpot Hero (Photo)
 *   02 - Heijing Kharai (Photo)
 *   03 - Photo Session with Friends (Photo)
 *   04 - Keina Teaser (Video 1 - Moving Photography)
 *   05 - Family Photo (Photo)
 *   06 - Candid with Friends (Photo - Top Caption)
 *   07 - Luhongba Teaser (Video 2 - Moving Photography)
 *   08 - Heirloom Monograph Cover (Closed 3D Hardbound Album: "WEDDING PACKAGES")
 *   09 - Folio 01: Essential Collection (Rs 49,999/-)
 *   10 - Folio 02: Classic Collection (Rs 59,999/- — 1 Photographer & 1 Videographer)
 *   11 - Folio 03: Premium Collection (Rs 79,999/- — 2 Photographers & 1 Videographer)
 *   12 - Folio 04: Luxury Collection (Rs 94,999/- — 2 Photographers & 2 Videographers)
 *   13 - Colophon / Reservations: "Let's Tell Your Story" (WhatsApp & Call)
 */
import { siteConfig } from '../data/siteConfig.js';
import { imageConfig } from '../data/imageConfig.js';
import { videoConfig } from '../data/videoConfig.js';
import { packageData } from '../data/packageData.js';
import { getPackageWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp.js';
import { prewarmVideos } from '../utils/videoPreloader.js';

export class CinematicAlbum {
  constructor(mountNode) {
    this.mountNode = mountNode;
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.touchStartY = 0;
    this.touchStartX = 0;
    this.slides = this.buildSlideDeck();
  }

  buildSlideDeck() {
    const { curatedSeries } = imageConfig;
    const { contact } = siteConfig.photographer;
    const [essential, classic, premium, luxury] = packageData.plans;

    // Slide 01: Hero Heijingpot
    const slide1 = {
      id: "slide-photo-1",
      type: "photo",
      chapterNumber: "01",
      chapterTag: curatedSeries[0].chapterTag,
      title: curatedSeries[0].title,
      caption: curatedSeries[0].caption,
      captionPosition: curatedSeries[0].captionPosition || "bottom",
      imageSrc: curatedSeries[0].src,
      imageAlt: curatedSeries[0].alt
    };

    // Slide 02: Heijing Kharai
    const slide2 = {
      id: "slide-photo-2",
      type: "photo",
      chapterNumber: "02",
      chapterTag: curatedSeries[1].chapterTag,
      title: curatedSeries[1].title,
      caption: curatedSeries[1].caption,
      captionPosition: curatedSeries[1].captionPosition || "bottom",
      imageSrc: curatedSeries[1].src,
      imageAlt: curatedSeries[1].alt
    };

    // Slide 03: Keina Teaser (Video 1 - Moving Photography)
    const slide3 = {
      id: "slide-video-keina",
      type: "video",
      videoId: videoConfig.keina.id,
      chapterNumber: "03",
      chapterTag: videoConfig.keina.chapterTag,
      title: videoConfig.keina.title,
      caption: videoConfig.keina.caption,
      captionPosition: "bottom",
      videoSrc: videoConfig.keina.src,
      poster: videoConfig.keina.poster
    };

    // Slide 04: Khundo Lengba (Garland Threading Ritual)
    const slide4 = {
      id: "slide-photo-khundo-lengba",
      type: "photo",
      chapterNumber: "04",
      chapterTag: curatedSeries[2].chapterTag,
      title: curatedSeries[2].title,
      caption: curatedSeries[2].caption,
      captionPosition: curatedSeries[2].captionPosition || "bottom",
      imageSrc: curatedSeries[2].src,
      imageAlt: curatedSeries[2].alt
    };

    // Slide 05: Family Photo
    const slide5 = {
      id: "slide-photo-4",
      type: "photo",
      chapterNumber: "05",
      chapterTag: curatedSeries[3].chapterTag,
      title: curatedSeries[3].title,
      caption: curatedSeries[3].caption,
      captionPosition: curatedSeries[3].captionPosition || "bottom",
      imageSrc: curatedSeries[3].src,
      imageAlt: curatedSeries[3].alt
    };

    // Slide 06: Candid with Friends (Top positioned caption)
    const slide6 = {
      id: "slide-photo-5",
      type: "photo",
      chapterNumber: "06",
      chapterTag: curatedSeries[4].chapterTag,
      title: curatedSeries[4].title,
      caption: curatedSeries[4].caption,
      captionPosition: curatedSeries[4].captionPosition || "top",
      imageSrc: curatedSeries[4].src,
      imageAlt: curatedSeries[4].alt
    };

    // Slide 07: Luhongba Teaser (Video 2 - Moving Photography)
    const slide7 = {
      id: "slide-video-luhongba",
      type: "video",
      videoId: videoConfig.luhongba.id,
      chapterNumber: "07",
      chapterTag: videoConfig.luhongba.chapterTag,
      title: videoConfig.luhongba.title,
      caption: videoConfig.luhongba.caption,
      captionPosition: "bottom",
      videoSrc: videoConfig.luhongba.src,
      poster: videoConfig.luhongba.poster
    };

    // Slide 08: HEIRLOOM ALBUM COVER (Closed Hardbound Album)
    const slide8 = {
      id: "slide-book-cover",
      type: "book-cover",
      chapterNumber: "08",
      chapterTag: "HEIRLOOM ALBUM",
      title: "WEDDING PACKAGES"
    };

    // Slide 09: FOLIO 01 — ESSENTIAL COLLECTION
    const slide9 = {
      id: "slide-package-essential",
      type: "book-page",
      folioTag: "FOLIO · 01",
      chapterNumber: "09",
      chapterTag: "ESSENTIAL",
      title: "ESSENTIAL COLLECTION",
      contentHtml: `
        <div class="pkg-header-allcaps">
          <span class="pkg-tier-label">COLLECTION 01</span>
          <h3 class="pkg-title-serif">ESSENTIAL</h3>
          <div class="pkg-price-gold">RS 49,999/-</div>
          <div class="pkg-divider-gold"></div>
        </div>

        <div class="pkg-events-pill">
          HEIJINGPOT • LUHONGBA • CHAKOUBA • POST WEDDING
        </div>

        <ul class="pkg-editorial-list">
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>500+ CURATED & COLOR-GRADED IMAGES</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>350+ PRINTED COPY</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PHOTOGRAPHER & 1 VIDEOGRAPHER</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PENDRIVE WITH PHOTO & VIDEO INCLUDED</span>
          </li>
        </ul>

        <a href="${getPackageWhatsAppUrl(essential.name, essential.price)}" target="_blank" rel="noopener noreferrer" class="pkg-editorial-cta">
          <span>RESERVE ESSENTIAL ON WHATSAPP</span>
          <span aria-hidden="true">→</span>
        </a>
      `
    };

    // Slide 10: FOLIO 02 — CLASSIC COLLECTION (NEW TIER)
    const slide10 = {
      id: "slide-package-classic",
      type: "book-page",
      folioTag: "FOLIO · 02",
      chapterNumber: "10",
      chapterTag: "CLASSIC",
      title: "CLASSIC COLLECTION",
      contentHtml: `
        <div class="pkg-header-allcaps">
          <span class="pkg-tier-label">COLLECTION 02</span>
          <h3 class="pkg-title-serif">CLASSIC</h3>
          <div class="pkg-price-gold">RS 59,999/-</div>
          <div class="pkg-divider-gold"></div>
        </div>

        <div class="pkg-events-pill">
          HEIJINGPOT • LUHONGBA • CHAKOUBA • POST WEDDING
        </div>

        <ul class="pkg-editorial-list">
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>500+ CURATED & COLOR-GRADED IMAGES</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>350+ PRINTED COPY</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span><span class="pkg-hero-highlight-text">PHOTOBOOK</span> (35–50 SHEETS)</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PHOTOGRAPHER & 1 VIDEOGRAPHER</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span class="pkg-hero-highlight-text">CINEMATIC VIDEO TEASER</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PENDRIVE WITH PHOTO & VIDEO INCLUDED</span>
          </li>
        </ul>

        <a href="${getPackageWhatsAppUrl(classic.name, classic.price)}" target="_blank" rel="noopener noreferrer" class="pkg-editorial-cta">
          <span>RESERVE CLASSIC ON WHATSAPP</span>
          <span aria-hidden="true">→</span>
        </a>
      `
    };

    // Slide 11: FOLIO 03 — PREMIUM COLLECTION
    const slide11 = {
      id: "slide-package-premium",
      type: "book-page",
      folioTag: "FOLIO · 03",
      chapterNumber: "11",
      chapterTag: "PREMIUM",
      title: "PREMIUM COLLECTION",
      contentHtml: `
        <div class="pkg-header-allcaps">
          <span class="pkg-tier-label">COLLECTION 03</span>
          <h3 class="pkg-title-serif">PREMIUM</h3>
          <div class="pkg-price-gold">RS 79,999/-</div>
          <div class="pkg-divider-gold"></div>
        </div>

        <div class="pkg-events-pill">
          HEIJINGPOT • LUHONGBA • CHAKOUBA • POST WEDDING
        </div>

        <ul class="pkg-editorial-list">
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>500+ CURATED & COLOR-GRADED IMAGES</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>350+ PRINTED COPY</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span><span class="pkg-hero-highlight-text">PHOTOBOOK</span> (35–50 SHEETS)</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span><span class="pkg-hero-highlight-text">2 PHOTOGRAPHERS</span> & 1 VIDEOGRAPHER</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span class="pkg-hero-highlight-text">CINEMATIC VIDEO TEASER</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PENDRIVE WITH PHOTO & VIDEO INCLUDED</span>
          </li>
        </ul>

        <a href="${getPackageWhatsAppUrl(premium.name, premium.price)}" target="_blank" rel="noopener noreferrer" class="pkg-editorial-cta">
          <span>RESERVE PREMIUM ON WHATSAPP</span>
          <span aria-hidden="true">→</span>
        </a>
      `
    };

    // Slide 12: FOLIO 04 — LUXURY COLLECTION
    const slide12 = {
      id: "slide-package-luxury",
      type: "book-page",
      folioTag: "FOLIO · 04",
      chapterNumber: "12",
      chapterTag: "LUXURY",
      title: "LUXURY COLLECTION",
      contentHtml: `
        <div class="pkg-header-allcaps">
          <span class="pkg-tier-label">COLLECTION 04</span>
          <h3 class="pkg-title-serif">LUXURY</h3>
          <div class="pkg-price-gold">RS 99,999/-</div>
          <div class="pkg-divider-gold"></div>
        </div>

        <div class="pkg-events-pill">
          PRE WEDDING • HEIJINGPOT • LUHONGBA • CHAKOUBA • POST WEDDING
        </div>

        <ul class="pkg-editorial-list">
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>500+ CURATED & COLOR-GRADED IMAGES</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>350+ PRINTED COPY</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span><span class="pkg-hero-highlight-text">PHOTOBOOK</span> (35–50 SHEETS)</span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span><span class="pkg-hero-highlight-text">2 PHOTOGRAPHERS & 2 VIDEOGRAPHERS</span></span>
          </li>
          <li class="pkg-item pkg-item-hero">
            <span class="pkg-item-bullet">✦</span>
            <span class="pkg-hero-highlight-text">CINEMATIC VIDEO TEASER</span>
          </li>
          <li class="pkg-item pkg-item-base">
            <span class="pkg-item-bullet">◈</span>
            <span>1 PENDRIVE WITH PHOTO & VIDEO INCLUDED</span>
          </li>
        </ul>

        <a href="${getPackageWhatsAppUrl(luxury.name, luxury.price)}" target="_blank" rel="noopener noreferrer" class="pkg-editorial-cta">
          <span>RESERVE LUXURY ON WHATSAPP</span>
          <span aria-hidden="true">→</span>
        </a>
      `
    };

    // Slide 13: COLOPHON / RESERVATIONS & DIRECT CONTACT
    const slide13 = {
      id: "slide-booking",
      type: "book-page",
      folioTag: "COLOPHON",
      chapterNumber: "13",
      chapterTag: "RESERVATIONS",
      title: "LET'S TELL YOUR STORY",
      contentHtml: `
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span class="pkg-tier-label">DIRECT COMMISSIONS</span>
          <h3 class="pkg-title-serif" style="font-size: 2rem; margin: 4px 0;">LET'S TELL YOUR STORY</h3>
          <div class="pkg-divider-gold" style="margin-bottom: 16px;"></div>

          <p style="font-family: var(--font-serif); font-style: italic; font-size: 1.15rem; color: #D4AF37; margin-bottom: 12px; max-width: 26ch;">
            "Your wedding deserves to be remembered as it felt."
          </p>

          <p style="font-family: var(--font-sans); font-size: 0.8rem; color: #A39E94; line-height: 1.6; max-width: 32ch; margin-bottom: 26px; letter-spacing: 0.04em;">
            In Manipur, wedding dates are fixed first. Once your dates are finalized, reach out directly on WhatsApp to check our availability and enquire about booking your wedding.
          </p>

          <a href="${getGeneralWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="pkg-editorial-cta" style="margin-bottom: 12px; background: #9E7D4B; border-color: #D4AF37;">
            <span>ENQUIRE ON WHATSAPP</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a href="tel:+${contact.whatsappNumber}" style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 11px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.15); color: #C8C2B7; border-radius: 2px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-decoration: none; margin-bottom: 20px;">
            <span>CALL: ${contact.whatsappDisplay}</span>
          </a>

          <div class="colophon-credits-lockup">
            <div class="colophon-brand-line">
              <span>PHOTOGRAPHY BY NARES KR</span>
              <span class="colophon-dot">•</span>
              <span>MANIPUR</span>
            </div>
            <div class="colophon-maintainer-line">
              <a href="https://banishwor.github.io/aboutme" target="_blank" rel="noopener noreferrer" class="colophon-dev-link">
                CRAFTED & MAINTAINED BY BANISHWOR ATHOKPAM ↗
              </a>
            </div>
          </div>
        </div>
      `
    };

    return [
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      slide7,
      slide8,
      slide9,
      slide10,
      slide11,
      slide12,
      slide13
    ];
  }

  render() {
    const { brandTitle, brandSubtitle } = siteConfig.photographer;
    const totalSlides = this.slides.length;

    this.mountNode.innerHTML = `
      <div class="monograph-stage" id="monograph-stage" role="region" aria-label="Fullscreen Wedding Monograph">
        <!-- Progress Bar along Top -->
        <div class="monograph-progress-track">
          <div class="monograph-progress-bar" id="monograph-progress-bar"></div>
        </div>

        <!-- Floating Top HUD Header -->
        <header class="monograph-hud-top">
          <div class="hud-brand-mark">
            <img 
              src="assets/images/branding/logo.png" 
              alt="Nares Kr Photography" 
              class="hud-brand-logo" 
            />
            <span class="hud-brand-sub">${brandSubtitle}</span>
          </div>
        </header>

        <!-- Slide Layers -->
        <div class="monograph-slides" id="monograph-slides-container">
          ${this.slides.map((slide, idx) => `
            <article class="monograph-slide ${idx === 0 ? 'is-active' : ''} ${slide.captionPosition === 'top' ? 'has-top-caption' : ''}" id="${slide.id}" data-index="${idx}">
              ${slide.type === 'photo' ? `
                <div class="monograph-photo-wrap">
                  <img 
                    src="${slide.imageSrc}" 
                    alt="${slide.imageAlt}" 
                    class="monograph-photo"
                    loading="${idx === 0 ? 'eager' : 'lazy'}"
                    fetchpriority="${idx === 0 ? 'high' : 'auto'}"
                  />
                  <div class="monograph-scrim" aria-hidden="true"></div>
                </div>

                <div class="monograph-caption-card ${slide.captionPosition === 'top' ? 'is-top' : ''}">
                  <span class="monograph-chapter-tag">${slide.chapterNumber} • ${slide.chapterTag}</span>
                  <h2 class="monograph-title">${slide.title}</h2>
                  <p class="monograph-desc">${slide.caption}</p>
                </div>
              ` : slide.type === 'video' ? `
                <div class="monograph-photo-wrap">
                  <video 
                    id="${slide.videoId}"
                    class="monograph-video"
                    src="${slide.videoSrc}"
                    data-original-src="${slide.videoSrc}"
                    poster="${slide.poster}"
                    playsinline
                    muted
                    preload="auto"
                  ></video>
                  <div class="monograph-scrim" aria-hidden="true"></div>
                </div>

                <!-- Floating Tiny Audio Toggle Icon -->
                <button 
                  class="video-audio-toggle" 
                  data-target="${slide.videoId}" 
                  aria-label="Unmute audio"
                  title="Toggle Sound"
                >
                  <svg class="audio-icon-muted" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                  <svg class="audio-icon-unmuted" style="display: none;" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>

                <div class="monograph-caption-card ${slide.captionPosition === 'top' ? 'is-top' : ''}">
                  <span class="monograph-chapter-tag">${slide.chapterNumber} • ${slide.chapterTag}</span>
                  <h2 class="monograph-title">${slide.title}</h2>
                  <p class="monograph-desc">${slide.caption}</p>
                </div>
              ` : slide.type === 'book-cover' ? `
                <div class="photobook-stage">
                  <div class="photobook-cover-card" id="photobook-cover-card">
                    <div class="photobook-ribbon" aria-hidden="true"></div>
                    <div>
                      <div class="cover-tag-mono">HEIRLOOM MONOGRAPH</div>
                      <h2 class="cover-title-serif">WEDDING<br>PACKAGES</h2>
                    </div>

                    <div class="cover-emblem-badge">
                      <span class="cover-crest">✦</span>
                      <div class="cover-author-serif">NARES KR</div>
                      <span class="cover-loc-mono">MANIPUR</span>
                    </div>
                  </div>
                </div>
              ` : `
                <div class="photobook-stage">
                  <div class="photobook-page-card">
                    <div class="folio-top-bar">
                      <span class="folio-badge-gold">${slide.folioTag || 'FOLIO'}</span>
                      <span>HEIRLOOM MONOGRAPH</span>
                    </div>
                    ${slide.contentHtml}
                  </div>
                </div>
              `}
            </article>
          `).join('')}
        </div>

        <!-- Floating Bottom HUD Controls -->
        <footer class="monograph-hud-bottom">
          <div class="hud-counter">
            <span id="hud-current-index" class="hud-counter-label">01</span>
            <span> / </span>
            <span>${String(totalSlides).padStart(2, '0')}</span>
            <span style="margin-left: 8px; color: #736E66;" id="hud-chapter-crumb">• PROLOGUE</span>
          </div>

          <div class="hud-nav-buttons">
            <button id="monograph-prev-btn" class="hud-arrow-btn" aria-label="Previous Slide">↑</button>
            <button id="monograph-next-btn" class="hud-arrow-btn" aria-label="Next Slide">↓</button>
          </div>
        </footer>
      </div>
    `;

    this.bindEvents();
    this.updateHUD();

    // Warm up videos in background for instantaneous zero-lag playback
    prewarmVideos([videoConfig.keina.src, videoConfig.luhongba.src]);
  }

  bindEvents() {
    const stage = document.getElementById('monograph-stage');
    if (!stage) return;

    // 1. Wheel / Trackpad Scroll (with debounce lockout)
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (this.isTransitioning) return;
      if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: false });

    // 2. Touch Gestures (Swipe Up / Down)
    stage.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      if (this.isTransitioning) return;

      const deltaY = this.touchStartY - e.changedTouches[0].clientY;
      const deltaX = this.touchStartX - e.changedTouches[0].clientX;

      if (Math.abs(deltaY) > 35 && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });

    // 3. Keyboard Arrow Navigation
    window.addEventListener('keydown', (e) => {
      if (this.isTransitioning) return;
      if (['ArrowDown', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
        this.next();
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.code)) {
        e.preventDefault();
        this.prev();
      }
    });

    // 4. Arrow Button Clicks
    document.getElementById('monograph-next-btn')?.addEventListener('click', () => this.next());
    document.getElementById('monograph-prev-btn')?.addEventListener('click', () => this.prev());

    // 5. Audio Toggle Buttons
    this.mountNode.querySelectorAll('.video-audio-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const video = document.getElementById(targetId);
        if (!video) return;

        video.muted = !video.muted;
        const iconMuted = btn.querySelector('.audio-icon-muted');
        const iconUnmuted = btn.querySelector('.audio-icon-unmuted');

        if (!video.muted) {
          video.volume = 1.0;
          btn.classList.add('is-unmuted');
          btn.setAttribute('aria-label', 'Mute audio');
          if (iconMuted) iconMuted.style.display = 'none';
          if (iconUnmuted) iconUnmuted.style.display = 'block';
        } else {
          btn.classList.remove('is-unmuted');
          btn.setAttribute('aria-label', 'Unmute audio');
          if (iconMuted) iconMuted.style.display = 'block';
          if (iconUnmuted) iconUnmuted.style.display = 'none';
        }
      });
    });

    // 6. Freeze at Last Frame (hold cleanly without looping)
    this.mountNode.querySelectorAll('.monograph-video').forEach(video => {
      video.addEventListener('ended', () => {
        video.pause();
      });
    });
  }

  goTo(index) {
    if (index < 0 || index >= this.slides.length) return;
    if (index === this.currentIndex || this.isTransitioning) return;

    this.isTransitioning = true;
    const prevIndex = this.currentIndex;
    const direction = index > prevIndex ? 'forward' : 'backward';
    const slideElements = document.querySelectorAll('.monograph-slide');

    // Pause all playing videos
    document.querySelectorAll('.monograph-video').forEach(vid => {
      vid.pause();
    });

    const prevSlideEl = slideElements[prevIndex];
    const nextSlideEl = slideElements[index];

    // Determine if both slides are within the photobook section (index >= 7)
    const isPrevBook = prevIndex >= 7;
    const isNextBook = index >= 7;

    if (isPrevBook && isNextBook) {
      if (direction === 'forward') {
        // Outgoing slide turns open to the left
        prevSlideEl?.classList.remove('is-active', 'turn-in-forward', 'turn-in-backward');
        prevSlideEl?.classList.add('turn-out-forward');

        // Incoming slide enters underneath
        nextSlideEl?.classList.remove('turn-out-forward', 'turn-out-backward');
        nextSlideEl?.classList.add('is-active', 'turn-in-forward');
      } else {
        // Outgoing slide recedes
        prevSlideEl?.classList.remove('is-active', 'turn-in-forward', 'turn-in-backward');
        prevSlideEl?.classList.add('turn-out-backward');

        // Incoming slide swings back from the left into reading position
        nextSlideEl?.classList.remove('turn-out-forward', 'turn-out-backward');
        nextSlideEl?.classList.add('is-active', 'turn-in-backward');
      }
    } else {
      // Standard slide transition (photos & videos)
      slideElements.forEach(el => {
        el.classList.remove('turn-out-forward', 'turn-out-backward', 'turn-in-forward', 'turn-in-backward');
      });
      prevSlideEl?.classList.remove('is-active');
      nextSlideEl?.classList.add('is-active');
    }

    this.currentIndex = index;

    // Autoplay current slide video if present
    const currentVideo = nextSlideEl?.querySelector('.monograph-video');
    if (currentVideo) {
      currentVideo.currentTime = 0;
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[Monograph Video] Autoplay interrupted:', err);
        });
      }
    }

    this.updateHUD();

    setTimeout(() => {
      // Clean up animation classes once transition settles
      if (prevSlideEl && prevSlideEl !== nextSlideEl) {
        prevSlideEl.classList.remove('turn-out-forward', 'turn-out-backward', 'is-active');
      }
      if (nextSlideEl) {
        nextSlideEl.classList.remove('turn-in-forward', 'turn-in-backward');
      }
      this.isTransitioning = false;
    }, 850);
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.goTo(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    }
  }

  updateHUD() {
    const currentNumEl = document.getElementById('hud-current-index');
    const crumbEl = document.getElementById('hud-chapter-crumb');
    const progressBar = document.getElementById('monograph-progress-bar');

    const activeSlide = this.slides[this.currentIndex];
    const total = this.slides.length;

    if (currentNumEl) {
      currentNumEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
    }

    if (crumbEl && activeSlide) {
      crumbEl.textContent = `• ${activeSlide.chapterTag}`;
    }

    if (progressBar) {
      const pct = ((this.currentIndex + 1) / total) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }
}
