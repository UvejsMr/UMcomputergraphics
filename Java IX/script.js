import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Reduced intensity for better contrast with the point light
scene.add(ambientLight);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);

sphere.castShadow = true;
plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere);
scene.add(plane);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5); // Adjusted position for better lighting
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff0000, 1, 10);
pointLight.position.set(2, 1, 0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

// Add a small sphere to represent the point light
const pointLightHelper = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
pointLightHelper.position.copy(pointLight.position);
scene.add(pointLightHelper);

const sizes = {
  width: 800,
  height: 600,
};

const spotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.fog = new THREE.Fog("#245673", 1, 5);

renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
