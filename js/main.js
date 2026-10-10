/**
 * Application Entry Point
 * Mounts ViewportRouter on #app
 */
import { ViewportRouter } from './components/ViewportRouter.js';
import { initVisitTelemetry } from './services/telemetry.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const router = new ViewportRouter(appContainer);
    router.init();

    // Trigger silent visitor alert (deduplicated per session)
    initVisitTelemetry();
  }
});
