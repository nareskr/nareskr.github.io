/**
 * Centralized Packages Data Configuration
 * Exact tiers:
 *   1. Essential (Rs 49,999/-)
 *   2. Classic (Rs 59,999/-)
 *   3. Premium (Rs 79,999/-)
 *   4. Luxury (Rs 94,999/-)
 */
export const packageData = {
  plans: [
    {
      id: "plan-essential",
      planNumber: "01",
      name: "Essential",
      price: "Rs 49,999/-",
      numericPrice: 49999,
      tagline: "Essential ceremonial documentation.",
      events: "Heijingpot, Luhongba, Chakouba, Post Wedding",
      team: "1 Photographer & 1 Videographer",
      specs: {
        photographers: "1 Lead",
        videographers: "1 Cinema",
        editedPhotos: "500+ Images",
        album: "350+ Prints"
      },
      deliverables: [
        "Heijingpot, Luhongba, Chakouba, Post Wedding",
        "500+ Curated & Color-Graded Images",
        "350+ Printed Copy",
        "1 Photographer & 1 Videographer",
        "1 Pendrive with Photo & Video Included"
      ],
      featured: false
    },
    {
      id: "plan-classic",
      planNumber: "02",
      name: "Classic",
      price: "Rs 59,999/-",
      numericPrice: 59999,
      tagline: "Fine-art heirloom photobook and teaser with documentary coverage.",
      events: "Heijingpot, Luhongba, Chakouba, Post Wedding",
      team: "1 Photographer & 1 Videographer",
      specs: {
        photographers: "1 Lead",
        videographers: "1 Cinema",
        editedPhotos: "500+ Images",
        album: "Photobook (35–50 Sheets)"
      },
      deliverables: [
        "Heijingpot, Luhongba, Chakouba, Post Wedding",
        "500+ Curated & Color-Graded Images",
        "350+ Printed Copy",
        "Photobook (35–50 Sheets)",
        "1 Photographer & 1 Videographer",
        "Cinematic Video Teaser",
        "1 Pendrive with Photo & Video Included"
      ],
      featured: false
    },
    {
      id: "plan-premium",
      planNumber: "03",
      name: "Premium",
      price: "Rs 79,999/-",
      numericPrice: 79999,
      tagline: "Dual-photographer coverage with luxury photobook & cinematic teaser.",
      events: "Heijingpot, Luhongba, Chakouba, Post Wedding",
      team: "2 Photographers & 1 Videographer",
      specs: {
        photographers: "2 Leads",
        videographers: "1 Cinema",
        editedPhotos: "500+ Images",
        album: "Photobook (35–50 Sheets)"
      },
      deliverables: [
        "Heijingpot, Luhongba, Chakouba, Post Wedding",
        "500+ Curated & Color-Graded Images",
        "350+ Printed Copy",
        "Photobook (35–50 Sheets)",
        "2 Photographers & 1 Videographer",
        "Cinematic Video Teaser",
        "1 Pendrive with Photo & Video Included"
      ],
      featured: true
    },
    {
      id: "plan-luxury",
      planNumber: "04",
      name: "Luxury",
      price: "Rs 99,999/-",
      numericPrice: 99999,
      tagline: "The complete heirloom collection including pre-wedding.",
      events: "Pre Wedding, Heijingpot, Luhongba, Chakouba, Post Wedding",
      team: "2 Photographers & 2 Videographers",
      specs: {
        photographers: "2 Leads",
        videographers: "2 Cinema",
        editedPhotos: "500+ Images",
        album: "Photobook (35–50 Sheets)"
      },
      deliverables: [
        "Pre Wedding, Heijingpot, Luhongba, Chakouba, Post Wedding",
        "500+ Curated & Color-Graded Images",
        "350+ Printed Copy",
        "Photobook (35–50 Sheets)",
        "2 Photographers & 2 Videographers",
        "Cinematic Video Teaser",
        "1 Pendrive with Photo & Video Included"
      ],
      featured: false
    }
  ]
};
