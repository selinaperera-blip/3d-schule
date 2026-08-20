import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const app = document.querySelector('#app');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fd8ff);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 250);
camera.position.set(18, 14, 20);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = true;
controls.minDistance = 8;
controls.maxDistance = 70;
controls.maxPolarAngle = Math.PI * 0.48;
controls.target.set(0, 2, 0);
controls.update();

const ambientLight = new THREE.HemisphereLight(0xffffff, 0x5f7f4f, 1.8);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
sunLight.position.set(18, 24, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(1024, 1024);
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 70;
sunLight.shadow.camera.left = -35;
sunLight.shadow.camera.right = 35;
sunLight.shadow.camera.top = 35;
sunLight.shadow.camera.bottom = -35;
scene.add(sunLight);

const groundGeometry = new THREE.PlaneGeometry(90, 90);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.9 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const building = new THREE.Group();
building.name = 'Testgebaeude';

const buildingBody = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 7),
  new THREE.MeshStandardMaterial({ color: 0xf2b84b, roughness: 0.75 }),
);
buildingBody.position.y = 2.5;
buildingBody.castShadow = true;
buildingBody.receiveShadow = true;
building.add(buildingBody);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(7.4, 2.6, 4),
  new THREE.MeshStandardMaterial({ color: 0xd85f45, roughness: 0.8 }),
);
roof.position.y = 6.25;
roof.rotation.y = Math.PI / 4;
roof.castShadow = true;
building.add(roof);

const entrance = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 2.1, 0.08),
  new THREE.MeshStandardMaterial({ color: 0x2e5f9e, roughness: 0.6 }),
);
entrance.position.set(0, 1.05, 3.54);
building.add(entrance);

const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x88c9ff, roughness: 0.25 });
for (const x of [-3.2, 3.2]) {
  for (const y of [2.2, 3.8]) {
    const windowPane = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.08), windowMaterial);
    windowPane.position.set(x, y, 3.55);
    building.add(windowPane);
  }
}

scene.add(building);

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
