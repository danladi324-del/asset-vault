# Asset Vault — Ebon Quill Summa

PWA dashboard/asset browser for interactive compendium assets, deployed via GitHub Pages.

## Deploy

1. Create a new repo on GitHub named `asset-vault` (github.dev or Working Copy on mobile).
2. Upload/commit this folder structure as-is:
   ```
   asset-vault/
   ├── index.html
   ├── manifest.json
   ├── asset_manifest_with_targets.csv
   ├── README.md
   ├── core/
   │   ├── app.css
   │   └── webgpu-base.js
   ├── assets/
   │   └── textures/        # Draw Things PNG textures, keyed to Asset ID
   └── modules/
       └── section-01/
           └── I-A-1_double_slit.html
   ```
3. Repo Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Live at `https://<your-username>.github.io/asset-vault/` within ~30s.
5. iPhone Safari → open the URL → Share → **Add to Home Screen**. Launches fullscreen, Eruda console auto-injects on screens <768px wide.

## Build standards (all 407 assets)

Per the builder handoff spec — apply these to every module, not just I-A-1:

- **Tokens**: `#0a0c10` bg, `#161b22` cards, `#30363d` borders, `#38bdf8` accent (all already in `core/app.css`).
- **Perf**: clamp `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0))` on any Three.js canvas (already in `core/webgpu-base.js`'s `createBaseScene`).
- **Input**: PointerEvents over legacy touch/mouse listeners; `touch-action: none` on every interactive canvas (already in `.stage` in `core/app.css`).
- **Asset typology** (407 total): 233 Dynamic SVGs (pure XML/CSS), 85 Historical/Archival Visuals (public-domain or Draw Things SDXL), 59 Data Matrices (HTML/CSS grid + KaTeX), 30 Interactive Applets (Canvas2D/WebGL). Check `asset_manifest_with_targets.csv`'s High-Level Target column per row — it overrides the Recommended File Type column when they conflict (e.g. I-A-1 is flagged interactive even though its file-type column says PNG/JPG; the static plate is a separate, later deliverable).
- **Textures**: generated noise maps, material overlays, and particle sprites go in `assets/textures/` as seamless 512×512 PNGs, named to their Asset ID (e.g. `I-A-1_particle_sprite.png`, `I-A-3_quantum_foam.png`).

## I-A-1 — built

`modules/section-01/I-A-1_double_slit.html` is a working build, matching the reference Bloch-sphere spec: a tabbed view with (1) a double-slit buildup simulator (Canvas2D, rejection-sampled from the sinc&sup2;&times;cos&sup2; interference intensity) and (2) a Bloch sphere (Three.js r159 via CDN import map, `AxesHelper`, an equator ring marking the phase-rotation plane, and touch OrbitControls). Latitude &theta; and phase &phi; are both live controls on the Bloch state vector; &phi; is also shared with the double-slit tab, since it's the same phase in both — shifting it slides the interference fringes and rotates the Bloch vector's azimuth together. `core/webgpu-base.js` supplies the shared `createBaseScene` / `startLoop` / `createCanvas2D` helpers it's built on.

Untested on-device — verify the tab switch, both canvases, and slider response after your next deploy, and flag anything that doesn't render or feels physically off.

## Adding new assets

1. Drop the new file under `modules/section-XX/`.
2. Add a `<a class="card">` entry to `index.html`'s `#asset-grid`.
3. Add a row to `asset_manifest_with_targets.csv`.
