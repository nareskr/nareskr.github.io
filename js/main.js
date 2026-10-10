/**
 * Application Entry Point
 * Mounts ViewportRouter on #app
 */
import { ViewportRouter } from './components/ViewportRouter.js';
import { initVisitTelemetry } from './services/telemetry.js';

function boot() {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const router = new ViewportRouter(appContainer);
    router.init();

    // Trigger silent visitor alert (deduplicated per session)
    initVisitTelemetry();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
