/**
 * Reusable Media Placeholder Component
 * Strictly preserves intended dimensions and editorial aesthetics without fabricating stock media.
 */
export function createMediaPlaceholder({
  type = "image", // "image" | "video" | "album" | "portrait"
  aspectRatio = "portrait", // "portrait" | "landscape" | "portrait-tall" | "square" | "album"
  label = "IMAGE PLACEHOLDER",
  hint = "Supplied asset will be placed here",
  customClass = ""
}) {
  return `
    <div class="media-placeholder media-placeholder--${aspectRatio} ${customClass}" role="img" aria-label="${label}">
      <span class="placeholder-badge">${type.toUpperCase()} PLACEHOLDER</span>
      <h4 class="placeholder-title">${label}</h4>
      <p class="placeholder-hint">${hint}</p>
    </div>
  `;
}
