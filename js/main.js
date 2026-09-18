/**
 * Application Entry Point
 * Mounts ViewportRouter on #app
 */
import { ViewportRouter } from './components/ViewportRouter.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const router = new ViewportRouter(appContainer);
    router.init();
  }
});
