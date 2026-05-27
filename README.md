# Three.js GLB Demo

A minimal static site that loads and renders a Blender-exported `.glb` model using Three.js. No build step — pure ES modules via importmap from a CDN.

## Local preview

The page uses ES modules and `fetch()`, so it must be served over HTTP (not `file://`). From the project root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying to GitHub Pages

1. Create a repo and push these files to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main` / root.
3. Your site will be served at `https://<user>.github.io/<repo>/`.

The `.nojekyll` file ensures GitHub Pages serves files like `models/moon.glb` as-is without Jekyll processing.

## Structure

- `index.html` — entrypoint with importmap pointing at unpkg's Three.js CDN
- `main.js` — scene, camera, lights, OrbitControls, GLTFLoader
- `style.css` — fullscreen canvas
- `models/moon.glb` — the model
