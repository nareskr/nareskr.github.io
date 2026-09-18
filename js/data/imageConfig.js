/**
 * Centralized Image Configuration
 * Maps the 5 curated high-resolution wedding photographs from Photo/New folder.
 * 1. Heijingpot 3.jpg - Hero Section
 * 2. Heijing kharai lanba Heijingpot.jpg
 * 3. Heijingpot Friends.jpg
 * 4. Luhongba Family group.jpg
 * 5. Candid Luhongba.jpg
 */
export const imageConfig = {
  hero: {
    src: "assets/images/web/heijingpot_3.jpg",
    alt: "Heijingpot 3 — Manipuri Wedding Rituals",
    title: "HEIJINGPOT",
    caption: "The beginning of a sacred journey in traditional finery."
  },

  curatedSeries: [
    // 01: Hero section (Heijingpot 3.jpg)
    {
      id: "curated-01",
      number: "01",
      chapterTag: "PROLOGUE",
      title: "HEIJINGPOT",
      caption: "The beginning of a sacred journey in traditional finery.",
      src: "assets/images/web/heijingpot_3.jpg",
      alt: "Heijingpot Ceremony — Manipuri Wedding Stories",
      captionPosition: "bottom"
    },

    // 02: Heijing kharai lanba Heijingpot.jpg
    {
      id: "curated-02",
      number: "02",
      chapterTag: "HEIJINGPOT",
      title: "HEIJING KHARAI",
      caption: "carrying fruits, blessings, and the beginning of two families becoming one.",
      src: "assets/images/web/heijing_kharai_lanba_heijingpot.jpg",
      alt: "Heijing Kharai — Sacred Blessings",
      captionPosition: "bottom"
    },

    // 03: Khundo Lengba.jpg
    {
      id: "curated-03",
      number: "04",
      chapterTag: "KHUNDO LENGBA",
      title: "KHUNDO LENGBA",
      caption: "Threading sacred blossoms with prayers, patience, and quiet grace.",
      src: "assets/images/web/khundo_lengba.jpg",
      alt: "Khundo Lengba — Sacred Garland Threading",
      captionPosition: "bottom"
    },

    // 04: Luhongba Family group.jpg
    {
      id: "curated-04",
      number: "04",
      chapterTag: "LUHONGBA",
      title: "FAMILY PHOTO",
      caption: "Love gathered in one frame, forever",
      src: "assets/images/web/luhongba_family_group.jpg",
      alt: "Family Photo — Love gathered in one frame",
      captionPosition: "bottom"
    },

    // 05: Candid Luhongba.jpg (Top positioned caption to utilize upper negative space)
    {
      id: "curated-05",
      number: "05",
      chapterTag: "LUHONGBA",
      title: "CANDID WITH FRIENDS",
      caption: "And just like that, a beautiful memory was made",
      src: "assets/images/web/candid_luhongba.jpg",
      alt: "Candid with Friends — Luhongba Memories",
      captionPosition: "top"
    }
  ]
};
