# Nares Kr Photography • Manipuri Wedding Stories

> *"Sacred Rituals. Quiet Luxury. Told Through Photographs."*

An editorial digital monograph documenting sacred Manipuri weddings in Manipur. Built with a mobile-first philosophy, tangible photobook aesthetics, and quiet luxury minimalism to preserve sacred wedding ceremonies—Heijingpot, Luhongba, and Chakouba—across generations.

---

## ✦ Key Highlights & Architecture

### 1. Mobile-First Cinematic Monograph
- **13 Sequential Curated Spreads**:
  - **Slides 01–02**: *Heijingpot* (Hero bridal portrait & *Heijing Kharai* sacred blessings).
  - **Slide 03**: *Moving Photography* (`Keina Teaser.mp4` — bridal moving portrait).
  - **Slide 04**: *Kundo Lengba* (Sacred jasmine garland threading ritual).
  - **Slides 05–06**: *Luhongba* (Family grouping & candid with friends).
  - **Slide 07**: *Moving Photography* (`Luhongba Teaser.mp4` — sacred wedding vows).
  - **Slide 08**: *Heirloom Photobook Cover* (Closed hardbound album with gold foil embossing & ribbon).
  - **Slides 09–12**: *Wedding Package Folios* (Essential, Classic, Premium, Luxury) with realistic **3D page-turning perspective physics**.
  - **Slide 13**: *Direct Commission Colophon* (WhatsApp booking, studio call, and maintainer credits).
- **Dual Gesture Engine**: Supports both vertical swipe/scroll (Reels/feed style) and horizontal swipe left/right (photobook page flip) with intelligent dominant-axis detection.

### 2. Desktop Split-Screen Presentation
- **Two-Column Editorial Grid** (for viewports $\ge$ 768px):
  - **Left Column**: Typography-driven brand narrative, ritual tags, direct booking actions, studio contact, and maintainer colophon.
  - **Right Column**: Interactive titanium smartphone mockup hosting the live wedding monograph inside a 390×844 virtual display with hardware Dynamic Island, glass reflection, and ambient gold backlight.
- **Zero-Page Scroll Mechanics**: The outer desktop browser window is fixed (`height: 100%; overflow: hidden;`), ensuring mouse wheel gestures, arrow keys (`↑` / `↓`), and on-screen controls navigate **exclusively inside the smartphone screen**.

### 3. Realistic 3D Inter-Package Page Turn
- Authentic book-binding page flips between package tiers using hardware-accelerated CSS 3D transforms (`rotateY(-112deg)` around a left spine axis).
- Dynamic two-element animation (`.turn-out-forward`, `.turn-in-forward`, `.turn-out-backward`, `.turn-in-backward`) ensuring seamless transition with zero ghost layers or blank states.

### 4. Official Brand Identity & Favicon Suite
- **Official Typography Logo**: High-contrast fashion serif wordmark (`logo.png`) rendered with luxury off-white inversion and subtle drop shadow over dark imagery.
- **Complete Favicon Suite**:
  - `assets/favicon.svg`: Infinitely scalable vector icon with obsidian background, gold hairline border, and serif `NK` monogram with heirloom diamond crest.
  - `assets/favicon-32x32.png`: Legacy browser bitmap fallback.
  - `assets/apple-touch-icon.png`: 180×180 high-res icon for iOS Safari and Android home screen bookmarking.

---

## ✦ Investment Packages Ladder

| Tier | Price | Events Covered | Team Composition | Key Deliverables |
|---|---|---|---|---|
| **ESSENTIAL** | **Rs 49,999/-** | 4 Events | 1 Photographer + 1 Videographer | 500+ Curated Images, 350+ Prints, Pendrive |
| **CLASSIC** | **Rs 59,999/-** | 4 Events | 1 Photographer + 1 Videographer | 500+ Images, 350+ Prints, **Photobook (35–50 Sheets)**, **Cinematic Video Teaser**, Pendrive |
| **PREMIUM** | **Rs 79,999/-** | 4 Events | **2 Photographers** + 1 Videographer | 500+ Images, 350+ Prints, **Photobook (35–50 Sheets)**, **Cinematic Video Teaser**, Pendrive |
| **LUXURY** | **Rs 99,999/-** | **5 Events** *(incl. Pre-Wedding)* | **2 Photographers + 2 Videographers** | 500+ Images, 350+ Prints, **Photobook (35–50 Sheets)**, **Cinematic Video Teaser**, Pendrive |

---

## ✦ Technology Stack & Design System

- **Core**: Vanilla HTML5, CSS3, Modern JavaScript (ES Modules). Zero bloated frameworks.
- **Design Tokens & Typography**:
  - **Display Serif**: *Cormorant Garamond* (Sacred editorial headings).
  - **Body Sans**: *Plus Jakarta Sans* (Clean, modern readability).
  - **Monospace**: *Space Mono* (Ritual metadata, chapter crumbs, folios).
- **Color Palette**:
  - Obsidian Canvas: `#0A0908` / `#0E0D0C`
  - Warm Ivory: `#FAF8F5` / `#FAF7F2`
  - Heirloom Gold: `#D4AF37` / `#9E7D4B`
  - Muted Mist: `#A39E94` / `#68645E`
- **SEO & Structured Data**:
  - Full OpenGraph & Twitter metadata.
  - Schema.org (`JSON-LD`) tagging photographer, developer, specialization, and location.

---

## ✦ Project Directory Structure

```
WEBSITE PROJECT/
├── assets/
│   ├── favicon.svg                  # Vector SVG monogram favicon
│   ├── favicon-32x32.png            # Desktop favicon
│   ├── apple-touch-icon.png         # iOS / Android touch icon
│   ├── images/
│   │   ├── branding/
│   │   │   └── logo.png             # Official Nares Kr typographic logo
│   │   └── web/
│   │       ├── heijingpot_3.jpg     # Hero bridal portrait
│   │       ├── heijing_kharai_lanba_heijingpot.jpg
│   │       ├── kundo_lengba.jpg     # Sacred garland threading
│   │       ├── luhongba_family_group.jpg
│   │       └── candid_luhongba.jpg
│   └── videos/
│       ├── Keina Teaser.mp4         # Moving photography (Slide 03)
│       └── Luhongba Teaser.mp4      # Moving photography (Slide 07)
├── css/
│   ├── variables.css                # Color tokens, typography scales, layout metrics
│   ├── typography.css               # Font imports & styling
│   ├── base.css                     # Reset, layout shells, accessibility
│   ├── cinematic-album.css          # Monograph engine, 3D page turn, HUD headers
│   ├── desktop-coming-soon.css      # Desktop split-screen & smartphone mockup
│   └── components.css               # Shared UI elements & badges
├── js/
│   ├── main.js                      # Application entry point
│   ├── components/
│   │   ├── ViewportRouter.js        # Responsive mobile / desktop viewport switcher
│   │   ├── CinematicAlbum.js        # Mobile monograph gesture engine & slide deck
│   │   ├── DesktopComingSoon.js     # Desktop split-screen layout & phone frame
│   │   └── PackageDetailModal.js    # Package modal details
│   ├── data/
│   │   ├── siteConfig.js            # Business data, developer profile, rituals
│   │   ├── packageData.js           # Package ladder, deliverables, pricing
│   │   ├── imageConfig.js           # Curated series image metadata
│   │   └── videoConfig.js           # Video metadata & poster paths
│   └── utils/
│       └── whatsapp.js              # Encoded direct booking links
├── index.html                       # Entry HTML with SEO & Schema.org metadata
├── serve.ps1                        # Lightweight local HTTP server (Port 8080)
└── README.md                        # Documentation & project guide
```

---

## ✦ Getting Started Locally

### Prerequisites
- Windows PowerShell 5.1+ (or PowerShell Core) or any static file server.

### Run Local Server
Execute the included lightweight PowerShell server:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Open your browser to:
- **Desktop Split-Screen**: [http://localhost:8080/](http://localhost:8080/)
- **Forced Mobile Monograph**: [http://localhost:8080/index.html?force=mobile](http://localhost:8080/index.html?force=mobile)

---

## ✦ Credits & Maintenance

- **Photography & Visual Direction**: **Nares Kr** (*Manipur, India*)
  - Instagram: [@nares_kr](https://www.instagram.com/nares_kr)
  - Email: [nareskr2025@gmail.com](mailto:nareskr2025@gmail.com)
  - WhatsApp: `+91 9625172963`
- **Digital Architecture, Engineering & Maintenance**: **Banishwor Athokpam**
  - Portfolio & Profile: [https://banishwor.github.io/aboutme](https://banishwor.github.io/aboutme)

---

## ✦ Copyright

© 2026 Nares Kr Photography. All rights reserved. Photographs and moving images are proprietary assets documenting sacred cultural ceremonies of Manipur.
