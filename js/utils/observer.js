/**
 * Performance-tuned IntersectionObserver Utility
 * Handles smooth scroll reveals, active chapter tracking, and video viewport control.
 */
export function initScrollObservers() {
  // 1. Reveal elements on scroll
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Once revealed, we can unobserve to save CPU cycles
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  });

  document.querySelectorAll('.reveal-init, .reveal-scale-init').forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Video viewport auto-pause / play
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.paused && video.getAttribute('data-autoplay') === 'true') {
          video.play().catch(() => {});
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('video[data-viewport-control="true"]').forEach(video => {
    videoObserver.observe(video);
  });

  // 3. Header scroll backdrop
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }
}
