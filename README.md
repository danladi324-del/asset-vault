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
   └── modules/
       └── section-01/
           └── I-A-1_double_slit.html
   ```
3. Repo Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Live at `https://<your-username>.github.io/asset-vault/` within ~30s.
5. iPhone Safari → open the URL → Share → **Add to Home Screen**. Launches fullscreen, Eruda console auto-injects on screens <768px wide.

## Next: build I-A-1

`modules/section-01/I-A-1_double_slit.html` is currently a stub. Replace it with the real build — prompt:

> Generate a self-contained HTML file for Asset I-A-1: Double-slit buildup simulator with a Bloch sphere visualizer using HTML5 Canvas2D and vanilla JavaScript. Include touch-friendly parameter sliders for photon emission rate and phase angle, mobile touch gesture OrbitControls for the Bloch sphere, and responsive styling matching a dark #0a0c10 palette.

`core/webgpu-base.js` has reusable helpers (`createBaseScene`, `startLoop`, `createCanvas2D`) if the module uses Three.js rather than pure Canvas2D.

## Adding new assets

1. Drop the new file under `modules/section-XX/`.
2. Add a `<a class="card">` entry to `index.html`'s `#asset-grid`.
3. Add a row to `asset_manifest_with_targets.csv`.
