# Orthographic vs Perspective

A small Three.js/WebGL demo that compares perspective and orthographic camera projection.
Three colored cubes are placed at different depths so the effect of switching cameras is
easy to see.

## Run the demo

The demo loads ES modules from a CDN, so open it through a local HTTP server rather than
directly from the filesystem.

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000/OrthovsPerspective.html](http://localhost:8000/OrthovsPerspective.html)
in a WebGL-enabled browser.

No package installation or build step is required.

## Controls

- Click **Switch to Orthographic** or **Switch to Perspective** to change cameras.
- Drag on the canvas to orbit around the scene.
- Scroll to zoom.
- Resize the browser window to update the camera projections.

## Implementation

- `OrthovsPerspective.html` provides the page controls and an import map for Three.js.
- `OrthovsPerspective.js` creates the scene, lighting, three rotating cubes, grid, cameras,
  orbit controls, and animation loop.
- Three.js `0.167.1` and `OrbitControls` are loaded from `unpkg.com`.