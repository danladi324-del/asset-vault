// core/webgpu-base.js
// Shared boilerplate for interactive asset modules (Section I.A.1 onward).
// Import as an ES module from a module HTML file, e.g.:
//   <script type="module" src="../../core/webgpu-base.js"></script>
// or, for self-contained module files, copy the relevant helper inline.

/**
 * Creates a full-viewport Three.js scene/camera/renderer wired to a
 * given canvas, with touch-friendly OrbitControls and resize handling.
 * Requires Three.js + OrbitControls to already be loaded on the page
 * (via CDN <script type="importmap"> or module import in the caller).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{ fov?: number, near?: number, far?: number, background?: number }} opts
 * @returns {{ scene, camera, renderer, controls, onResize: Function }}
 */
export function createBaseScene(THREE, OrbitControls, canvas, opts = {}) {
  const { fov = 50, near = 0.1, far = 100, background = 0x0a0c10 } = opts;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);

  const camera = new THREE.PerspectiveCamera(
    fov,
    canvas.clientWidth / canvas.clientHeight,
    near,
    far
  );
  camera.position.set(0, 0, 4);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };

  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  window.addEventListener("resize", onResize);
  onResize();

  return { scene, camera, renderer, controls, onResize };
}

/**
 * Starts a render loop, calling `tick(dt, elapsed)` each frame before
 * rendering. Returns a stop function.
 */
export function startLoop({ renderer, scene, camera, controls }, tick) {
  let last = performance.now();
  let raf;

  function frame(now) {
    const dt = (now - last) / 1000;
    last = now;
    controls?.update();
    tick?.(dt, now / 1000);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/**
 * Minimal 2D Canvas helper for asset modules that don't need Three.js
 * (e.g. double-slit buildup patterns, particle accumulation plots).
 * Handles devicePixelRatio scaling and resize.
 */
export function createCanvas2D(canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  return { ctx, resize };
}
