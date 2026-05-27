import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b10);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 2, 5);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

let model = null;
const SPIN_RADIANS_PER_SECOND = 0.1;
const clock = new THREE.Clock();

scene.add(new THREE.AmbientLight(0xffffff, 0.05));
const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
dirLight.position.set(5, 3, 5);
scene.add(dirLight);

const loader = new GLTFLoader();
loader.load(
  './models/moon.glb',
  (gltf) => {
    const loaded = gltf.scene;
    const lights = [];
    loaded.traverse((obj) => { if (obj.isLight) lights.push(obj); });
    lights.forEach((l) => l.parent?.remove(l));

    const box = new THREE.Box3().setFromObject(loaded);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    loaded.position.sub(center);

    model = new THREE.Group();
    model.add(loaded);
    scene.add(model);

    camera.position.copy(new THREE.Vector3(0, 0, size * 1.5));
    controls.target.set(0, 0, 0);
    controls.update();
  },
  undefined,
  (err) => console.error('Failed to load model:', err)
);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  if (model) model.rotation.y += SPIN_RADIANS_PER_SECOND * dt;
  controls.update();
  renderer.render(scene, camera);
}
animate();
