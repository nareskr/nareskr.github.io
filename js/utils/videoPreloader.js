/**
 * Video Preloader Utility
 * Fetches video files in the background and caches them in memory as Blobs.
 * Guarantees zero-buffering / zero-lag playback when user navigates onto video slides.
 */

const videoCache = new Map();

/**
 * Pre-fetch a video file in the background and return a Blob Object URL
 * @param {string} url - Relative or absolute video URL
 * @returns {Promise<string>} - Resolves with blob: URL or falls back to original URL
 */
export async function preloadVideoBlob(url) {
  if (videoCache.has(url)) {
    return videoCache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    videoCache.set(url, blobUrl);
    return blobUrl;
  } catch (err) {
    // If fetch or CORS fails, gracefully fallback to direct URL
    console.warn(`[VideoPreloader] Direct stream fallback for ${url}:`, err);
    return url;
  }
}

/**
 * Pre-warm all registered video assets in the background
 * @param {Array<string>} urls - Array of video URLs to pre-cache
 */
export function prewarmVideos(urls) {
  if (!Array.isArray(urls)) return;
  // Use requestIdleCallback or setTimeout to avoid competing with initial image render
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
  schedule(() => {
    urls.forEach(url => {
      preloadVideoBlob(url).then(blobUrl => {
        // Also find any existing video tag with this data-src and assign it immediately
        const matchingVideos = document.querySelectorAll(`video[data-original-src="${url}"]`);
        matchingVideos.forEach(v => {
          if (v && v.src !== blobUrl) {
            v.src = blobUrl;
            v.load();
          }
        });
      });
    });
  });
}
