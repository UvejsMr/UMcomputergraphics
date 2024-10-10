import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

const container = document.getElementById("scene");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const cube1 = new THREE.Mesh(geometry, material1);
cube1.position.x = -1.5;
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, material2);
cube2.position.x = 1.5;
scene.add(cube2);

function animate() {
  requestAnimationFrame(animate);

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y -= 0.01;

  renderer.render(scene, camera);
}

animate();
