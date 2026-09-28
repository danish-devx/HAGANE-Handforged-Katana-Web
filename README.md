⚔️ HAGANE 鋼 — Handforged Katana
The steel remembers.

A cinematic, scroll-driven landing page for a fictional Japanese swordsmith atelier —featuring a 100% procedurally generated 3D katana (zero model files), a customGLSL hamon shader, and GSAP-choreographed scroll storytelling.

Live Demo: https://your-url.vercel.app

ReactThree.jsGSAPTailwindVite

✨ Highlights
🔥 Procedural Katana — blade, habaki, tsuba, tsuka and saya are all generated fromraw BufferGeometry. No .glb files, no external assets — the entire sword lives in code.
🌊 Hamon (Temper-Line) Shader — the wavy quench line is a GLSL fragment patchinjected into MeshStandardMaterial via onBeforeCompile, keeping full PBR andenvironment lighting intact.
🗡️ Unsheath Intro — the blade physically slides out of the saya (scabbard); thehidden portion is occluded by the depth buffer alone. No clipping planes, no tricks.
🌸 Scroll-Reactive Sakura — an InstancedMesh of petals whose wind impulse is drivenby live scroll velocity (Lenis). Scroll fast → petal storm. Scroll slow → stillness.
📌 Pinned Anatomy Journey — ScrollTrigger pins the section while the camera travelsthe blade through 4 named stations (切先 Kissaki · 刃文 Hamon · 鍔 Tsuba · 柄 Tsuka),with HTML labels anchored in 3D space via drei Html.
↔️ Horizontal Forge — vertical scroll translates into horizontal panel travel, withcontainerAnimation-based reveals and a live furnace-temperature HUD that peaks at1,320°C during yaki-ire, then quenches.
🎴 Japanese Editorial Design — traditional palette (墨 sumi · 生成 kinari · 朱 shu ·金 kin), Mincho typography, hanko seal micro-interactions, vertical writing-mode kanji.
♿ Accessible Motion — full prefers-reduced-motion support: cinematic layersgracefully degrade while every scroll-driven interaction remains functional.
⚡ Performance-Minded — vendor chunk splitting, frameloop pausing off-screen,DPR cap [1, 2], dynamic draw usage, mobile fallbacks via gsap.matchMedia.
🧠 Architecture — The State Bridge
The core pattern that keeps GSAP, ScrollTrigger and Three.js decoupled:

GSAP / ScrollTrigger          useFrame (every frame)         Three.js scenetweens plain numbers    →     reads numbers, damps     →     applies transforms(katanaState.unsheath)        and eases them                 (position, rotation)
GSAP never touches a mesh directly. This made every animation source — the introtimeline, scrub-linked ScrollTriggers, mouse parallax — compose onto the same swordwithout a single refactor.

📄 Sections
#	Section	Technique
—	Preloader	鋼 kanji blur-in, counter, ink-exit handover
—	Navbar	kanji-swap link slots, active-section tracking, scroll progress line, fullscreen mobile menu
00	Hero	gallery-plinth composition, mask-reveal statement, hanko seal stamp-in
—	Marquee	tilted vermilion ribbon, CSS infinite loop
01	Philosophy	word-by-word scrub reveal + SVG brush underline (pathLength)
02	Anatomy	pinned camera journey, 3D-anchored labels, station index
03	The Forge	horizontal scroll, containerAnimation reveals, temperature HUD, rising embers
04	Specifications	count-up numerals, blueprint measure line, material swatches
05	Variants	asymmetric grid, quickTo 3D tilt + silhouette parallax, hanko stamp-in
—	Quote	Musashi, parallax watermark
06	Reserve	form state machine (idle → sending → sealed), live nakago engraving preview
—	Footer	live Seki JST clock, bleeding wordmark
🛠️ Tech Stack
Layer	Tool
Build	Vite 5 + React 18
Styling	TailwindCSS v4, custom @theme tokens
3D	Three.js + @react-three/fiber + drei
Animation	GSAP 3 + ScrollTrigger, gsap.matchMedia
Smooth scroll	Lenis (synced to GSAP ticker)
Typography	Shippori Mincho B1 · Zen Kaku Gothic New
🚀 Getting Started
git clone https://github.com/YOUR-USERNAME/hagane.gitcd haganenpm installnpm run dev
Script	Purpose
npm run dev	dev server
npm run build	production build
npm run preview	serve the production build locally
The 3D environment uses drei's preset (downloads an HDRI from a CDN at runtime).Fully offline? Swap in a procedural Lightformer rig as shown in KatanaScene.jsx.

📁 Project Structure
src/├── three/                  # 3D layer (React-UI agnostic)│   ├── KatanaScene.jsx     # Canvas, lights, camera rig, intro timeline│   ├── Katana.jsx          # Assembly + float/rotation/unsheath driver│   ├── AnatomyLabels.jsx   # HTML labels anchored in 3D (drei Html)│   ├── Petals.jsx          # Sakura InstancedMesh + wind physics│   ├── katanaState.js      # Global pose state — the GSAP ↔ useFrame bridge│   ├── parts/              # Blade · Habaki · Tsuba · Tsuka · Saya│   ├── geometry/           # Pure math: bladeGeometry, sayaGeometry, curveUtils│   └── materials/          # HamonMaterial (GLSL) · PBR presets├── components/│   ├── sections/           # 12 page sections│   └── ui/                 # SealStamp, InkDivider, ForgeIcon, ...├── hooks/                  # useLenis · useReveal├── utils/                  # gsapSetup (plugins + REDUCED flag)└── data/                   # Content: forgeSteps · specs · variants
🎛️ Tuning the Blade
Because the sword is parametric, variants are just configs:

export const BLADE_CONFIG = {  length: 70,
Knob	File	Effect
curve / curveExponent	bladeGeometry.js	blade silhouette
hamonLine base + noise	HamonMaterial.jsx	temper-line character
LOBES / WOBBLE	Tsuba.jsx	guard shape (mokko / sanko / round)
STATIONS[]	Anatomy.jsx	camera framing per part
TEMP_CURVE	Forge.jsx	furnace temperature story
♿ Accessibility & Performance
prefers-reduced-motion: Lenis, idle float, petals, marquees and autonomous tweensare disabled — scrub-driven interactions remain fully usable.
Canvas frameloop pauses when the 3D scene is off-screen (hero + anatomy only).
Vendor chunks (three, gsap, lenis) are split for long-term caching.
Mobile: the horizontal forge falls back to a vertical stack via gsap.matchMedia;petal count and DPR scale down.
📦 Deployment
Deployed on Vercel (auto-deploys on push to main):

npm i -D vercelnpx vercel --prod
No custom config needed — Vite is auto-detected.

🙏 Credits & Notes
Design inspiration: sumi-e ink painting, traditional Japanese craft sites, and themuseum presentation of nihontō.
Katana terminology and forging process: traditional nihontō craft references.
Quote: Miyamoto Musashi, The Book of Five Rings (五輪書).
HAGANE is a fictional atelier — this project is a WebGL tribute to theswordsmith's craft, and a demonstration of procedural 3D and scroll choreography.
📄 License
MIT — forge freely. ⚔️

