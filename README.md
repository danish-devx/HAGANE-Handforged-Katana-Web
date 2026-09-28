# HAGANE 鋼

### The steel remembers.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_HAGANE-c4472f?style=for-the-badge&logo=vercel&logoColor=white)](https://hagane-handforged-katana-web.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.8-61dafb?style=flat-square&logo=react&logoColor=111111)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-111111?style=flat-square)](#license)

HAGANE is a cinematic, scroll-driven digital atelier for a fictional Japanese swordsmith. The experience combines a procedurally generated 3D katana, custom GLSL shading, and editorial Japanese-inspired art direction into one interactive WebGL journey.

**Live experience:** [hagane-handforged-katana-web.vercel.app](https://hagane-handforged-katana-web.vercel.app/)

## Highlights

- **Procedural katana:** Blade, habaki, tsuba, tsuka, and saya are generated from raw `BufferGeometry`. No `.glb` model files are required.
- **Custom hamon shader:** A fragment shader patch adds a distinct wavy temper line while preserving PBR materials and environment lighting.
- **Physical unsheathing:** The blade slides out of the saya and relies on depth occlusion rather than clipping planes.
- **Scroll-reactive sakura:** Instanced petals respond to live Lenis scroll velocity, moving from stillness to a wind-driven storm.
- **Pinned anatomy journey:** ScrollTrigger moves the camera through four named stations: Kissaki, Hamon, Tsuba, and Tsuka.
- **Horizontal forge sequence:** Vertical scroll becomes horizontal panel travel with a live furnace-temperature HUD peaking at 1,320°C during yaki-ire.
- **Editorial Japanese direction:** Sumi, kinari, shu, and kin tones meet Mincho typography, hanko seals, vertical kanji, and ink-inspired transitions.
- **Reduced-motion support:** `prefers-reduced-motion` keeps the content usable while disabling autonomous cinematic motion.

## Experience Map

| Section | Experience |
| --- | --- |
| Preloader | Kanji blur-in, progress counter, and ink-exit handover |
| Hero | Gallery plinth composition, statement reveal, and hanko stamp-in |
| Philosophy | Word-by-word scrub reveal with a brush underline |
| Anatomy | Pinned camera journey with labels anchored in 3D space |
| The Forge | Horizontal scroll, temperature HUD, and rising embers |
| Specifications | Count-up numerals, blueprint measure line, and material swatches |
| Variants | 3D tilt, silhouette parallax, and alternate blade configurations |
| Reserve | Form state machine with a live nakago engraving preview |
| Footer | Live Seki, Japan clock and closing wordmark |

## Tech Stack

| Layer | Tools |
| --- | --- |
| App | React 19, Vite 8 |
| 3D | Three.js, React Three Fiber, drei |
| Animation | GSAP, ScrollTrigger, `gsap.matchMedia` |
| Smooth scroll | Lenis, synchronized with the GSAP ticker |
| Styling | Tailwind CSS v4 and custom CSS tokens |
| Typography | Shippori Mincho B1 and Zen Kaku Gothic New |

## Architecture

The animation system uses a small shared state bridge. GSAP writes plain numeric values, while the Three.js render loop reads and damps them every frame. This keeps scroll choreography, pointer parallax, and 3D transforms independent from one another.

```text
GSAP / ScrollTrigger  ->  katanaState  ->  useFrame  ->  3D transforms
                         plain numbers     damping       position / rotation
```

The 3D layer is organized into reusable geometry, material, and part modules:

```text
src/
├── components/       Page sections and reusable UI
├── data/              Forge steps, specifications, and variants
├── hooks/             Lenis and scroll-reveal hooks
├── three/
│   ├── geometry/      Blade, saya, and curve math
│   ├── materials/     Hamon shader and PBR presets
│   ├── parts/         Blade, habaki, tsuba, tsuka, and saya
│   ├── Katana.jsx     Assembly and pose driver
│   └── KatanaScene.jsx
└── utils/             GSAP plugin and reduced-motion setup
```

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone <your-github-repository-url>
cd hagane
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

HAGANE is deployed on Vercel and can be redeployed automatically from the connected GitHub repository.

```bash
npx vercel --prod
```

Vite is detected automatically, so no custom Vercel configuration is required.

The 3D environment uses a drei preset and may download an HDRI from a CDN at runtime. For a fully offline setup, replace it with a procedural Lightformer rig in `KatanaScene.jsx`.

## Performance and Accessibility

- Lenis, idle float, petals, marquees, and autonomous tweens respect reduced-motion preferences.
- Scroll-driven interactions remain available when cinematic motion is disabled.
- The canvas pauses when the 3D scene is off-screen.
- Three, GSAP, and Lenis are split into vendor chunks for long-term caching.
- Mobile layouts reduce petal count and device pixel ratio, and convert the forge sequence into a vertical stack.

## Credits

HAGANE draws from sumi-e ink painting, Japanese craft presentation, and the visual language of traditional nihontō. The atelier, sword, and interactions are fictional. The Musashi quotation references *The Book of Five Rings* (五輪書).

## License

MIT. Forge freely. ⚔️
