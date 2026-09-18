/**
 * ViewportRouter Component
 * Routes between the Fullscreen Cinematic Monograph (MobileExperience)
 * and the dedicated Editorial DesktopComingSoon screen (DesktopExperience).
 */
import { CinematicAlbum } from './CinematicAlbum.js';
import { renderDesktopComingSoon, initDesktopSimulatorEvents } from './DesktopComingSoon.js';

export class ViewportRouter {
  constructor(mountNode) {
    this.mountNode = mountNode;
    this.currentMode = null;
    this.albumInstance = null;
    this.handleResize = this.handleResize.bind(this);
  }

  isMobile() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('force') === 'mobile') return true;
    return window.innerWidth < 768;
  }

  init() {
    this.render();
    window.addEventListener('resize', this.debounce(this.handleResize, 150));
  }

  handleResize() {
    const shouldBeMobile = this.isMobile();
    const newMode = shouldBeMobile ? 'mobile' : 'desktop';
    if (newMode !== this.currentMode) {
      this.render();
    }
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  render() {
    const isMobile = this.isMobile();
    this.currentMode = isMobile ? 'mobile' : 'desktop';

    if (isMobile) {
      this.albumInstance = new CinematicAlbum(this.mountNode);
      this.albumInstance.render();
    } else {
      this.mountNode.innerHTML = renderDesktopComingSoon();
      const phoneMount = document.getElementById('desktop-phone-screen');
      if (phoneMount) {
        this.albumInstance = new CinematicAlbum(phoneMount);
        this.albumInstance.render();
        initDesktopSimulatorEvents(this.albumInstance);
      }
    }
  }
}
