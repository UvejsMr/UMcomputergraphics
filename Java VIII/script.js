import * as THREE from "three";

const scene = new THREE.Scene();
const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
const boxmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const box = new THREE.Mesh(boxgeometry, boxmaterial);

const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xff5577,
});
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 2;

const PlaneMaterial = new THREE.MeshBasicMaterial({
  color: 0x226622,
});

const PlaneGeometry = new THREE.PlaneGeometry(10, 10, 20, 20);
const plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);

plane.rotation.x = Math.PI / 4;

scene.add(box);
scene.add(sphere);
scene.add(plane);

const ambient = new THREE.AmbientLight(0xfde788, 1);
scene.add(ambient);

const spot = new THREE.SpotLight(0xfbf4db, 1, 5, 25);
spot.position.x = 1;
spot.position.z = 2;
spot.position.y = 1;
scene.add(spot);

const spotLightHelper = new THREE.SpotLightHelper(spot);
scene.add(spotLightHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 1, 1);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

const width = 10;
const height = 10;
const intensity = 1;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(0, 0, -2);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

const rectLightHelper = new RectAreaLightHelper(rectLight);
rectLight.add(rectLightHelper);

const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

renderer.render(scene, camera);
