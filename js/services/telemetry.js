/**
 * Telemetry & Real-Time Lead Notification Service (powered by ntfy.sh)
 * 
 * Silently alerts the photographer via push notifications when:
 * 1. A new visitor lands on the portfolio
 * 2. A visitor navigates through all folios to the final booking slide (Slide 13)
 * 3. A visitor taps any WhatsApp enquiry CTA
 * 
 * Strict session deduplication via sessionStorage ensures zero alert spam.
 * All requests are asynchronous with keepalive and fail silently without impacting UX.
 */

const NTFY_TOPIC = 'nareskr_wedding_alerts_live92x';
const NTFY_ENDPOINT = `https://ntfy.sh/${NTFY_TOPIC}`;

/**
 * Detect if running in local development
 */
function isLocalhost() {
  const host = window.location.hostname;
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '' ||
    window.location.protocol === 'file:' ||
    new URLSearchParams(window.location.search).has('debug_telemetry_off')
  );
}

/**
 * Detect client device classification
 */
function getDeviceContext() {
  const ua = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
  let os = 'Desktop';
  if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac';
  else if (/Linux/i.test(ua)) os = 'Linux';

  const screenMetrics = `${window.innerWidth}×${window.innerHeight}`;
  return `${isMobile ? 'Mobile' : 'Desktop'} (${os}) [${screenMetrics}]`;
}

/**
 * Detect referral origin
 */
function getReferralSource() {
  const referrer = document.referrer;
  if (!referrer) return 'Direct / Link';
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes('instagram.com')) return 'Instagram (@nares_kr)';
    if (host.includes('google.')) return 'Google Search';
    if (host.includes('facebook.com')) return 'Facebook';
    if (host.includes('whatsapp.')) return 'WhatsApp Link';
    if (host.includes('youtube.com')) return 'YouTube';
    return host;
  } catch (e) {
    return 'Web Referral';
  }
}

/**
 * Format elapsed duration into human-readable text
 */
function getElapsedDuration() {
  const startTime = parseInt(sessionStorage.getItem('nares_session_start_time') || Date.now().toString(), 10);
  const elapsedSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
  
  if (elapsedSec < 60) return `${elapsedSec}s`;
  const mins = Math.floor(elapsedSec / 60);
  const remSec = elapsedSec % 60;
  return `${mins}m ${remSec}s`;
}

/**
 * Dispatch notification to ntfy.sh
 */
async function sendNotification({ title, message, priority = 3, tags = [] }) {
  if (isLocalhost()) {
    console.log(`[ntfy:dev-mode] ${title}: ${message}`);
    return;
  }

  try {
    await fetch(NTFY_ENDPOINT, {
      method: 'POST',
      body: message,
      headers: {
        'Title': title,
        'Priority': String(priority),
        'Tags': tags.join(','),
        'Click': 'https://nareskr.github.io/'
      },
      mode: 'cors',
      keepalive: true
    });
  } catch (error) {
    // Fail silently — telemetry should never disturb user experience
  }
}

/**
 * 1. Initial Site Visit Alert
 * Deduplicated per browser session
 */
export function initVisitTelemetry() {
  try {
    if (!sessionStorage.getItem('nares_session_start_time')) {
      sessionStorage.setItem('nares_session_start_time', Date.now().toString());
    }

    if (sessionStorage.getItem('nares_alert_visited')) return;
    sessionStorage.setItem('nares_alert_visited', '1');

    const device = getDeviceContext();
    const source = getReferralSource();

    sendNotification({
      title: '👀 New Wedding Portfolio Visitor',
      message: `Visitor arrived • Source: ${source}\nDevice: ${device}`,
      priority: 3,
      tags: ['eyes', 'camera']
    });
  } catch (e) {
    // Fail silently
  }
}

/**
 * 2. High-Intent Lead Reached Slide 13 (Reservations spread)
 * Deduplicated per browser session
 */
export function trackSlideMilestone(slideIndex, totalSlides, slideId) {
  try {
    // Check if on final Reservations / Booking slide
    if (slideIndex !== totalSlides - 1 && slideId !== 'slide-booking') return;

    if (sessionStorage.getItem('nares_alert_slide13')) return;
    sessionStorage.setItem('nares_alert_slide13', '1');

    const duration = getElapsedDuration();
    const device = getDeviceContext();
    const source = getReferralSource();

    sendNotification({
      title: '💍 High-Intent Lead Reached Slide 13!',
      message: `Visitor viewed all wedding folios and reached the Reservations spread!\nTime on site: ${duration} • Source: ${source}\nDevice: ${device}`,
      priority: 4, // High priority sound alert on phone
      tags: ['ring', 'tada', 'bell']
    });
  } catch (e) {
    // Fail silently
  }
}

/**
 * 3. Direct WhatsApp CTA Click Alert
 * Deduplicated per CTA per session
 */
export function trackWhatsAppClick(packageName = 'General') {
  try {
    const key = `nares_alert_wa_${packageName.replace(/\s+/g, '_')}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    const duration = getElapsedDuration();
    const device = getDeviceContext();

    sendNotification({
      title: '💬 WhatsApp Enquiry Tapped!',
      message: `A client tapped the WhatsApp booking button (${packageName})\nTime on site: ${duration} • Device: ${device}`,
      priority: 4,
      tags: ['speech_balloon', 'heart']
    });
  } catch (e) {
    // Fail silently
  }
}
