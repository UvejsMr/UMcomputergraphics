import * as THREE from "three";
import GUI from "lil-gui";

const scene = new THREE.Scene();

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x7ec850,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Create cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, 0.5, 0);
scene.add(cylinder);

// Create cone
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2, 0.5, 0);
scene.add(cone);

// Create circle (using a PlaneGeometry as it's 2D)
const circleGeometry = new THREE.CircleGeometry(0.5, 32);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(-2, 0.5, 0);
scene.add(circle);

const gui = new GUI();

// Controls for the cylinder
const cylinderControls = {
  position: { x: 0, y: 0.5, z: 0 },
  color: cylinder.material.color.getHex(),
};

const cylinderFolder = gui.addFolder("Cylinder Controls");
cylinderFolder.add(cylinderControls.position, "x", -5, 5).onChange(() => {
  if (cylinderControls.position.x >= -5 && cylinderControls.position.x <= 5) {
    cylinder.position.x = cylinderControls.position.x;
  }
});
cylinderFolder.add(cylinderControls.position, "y", 0.5, 3).onChange(() => {
  cylinder.position.y = cylinderControls.position.y;
});
cylinderFolder.add(cylinderControls.position, "z", -5, 5).onChange(() => {
  if (cylinderControls.position.z >= -5 && cylinderControls.position.z <= 5) {
    cylinder.position.z = cylinderControls.position.z;
  }
});
cylinderFolder.addColor(cylinderControls, "color").onChange((color) => {
  cylinder.material.color.set(color);
});
cylinderFolder.open();

// Controls for the cone
const coneControls = {
  position: { x: 2, y: 0.5, z: 0 },
  color: cone.material.color.getHex(),
};

const coneFolder = gui.addFolder("Cone Controls");
coneFolder.add(coneControls.position, "x", -5, 5).onChange(() => {
  if (coneControls.position.x >= -5 && coneControls.position.x <= 5) {
    cone.position.x = coneControls.position.x;
  }
});
coneFolder.add(coneControls.position, "y", 0.5, 3).onChange(() => {
  cone.position.y = coneControls.position.y;
});
coneFolder.add(coneControls.position, "z", -5, 5).onChange(() => {
  if (coneControls.position.z >= -5 && coneControls.position.z <= 5) {
    cone.position.z = coneControls.position.z;
  }
});
coneFolder.addColor(coneControls, "color").onChange((color) => {
  cone.material.color.set(color);
});
coneFolder.open();

// Controls for the circle
const circleControls = {
  position: { x: -2, y: 0.5, z: 0 },
  color: circle.material.color.getHex(),
};

const circleFolder = gui.addFolder("Circle Controls");
circleFolder.add(circleControls.position, "x", -5, 5).onChange(() => {
  if (circleControls.position.x >= -5 && circleControls.position.x <= 5) {
    circle.position.x = circleControls.position.x;
  }
});
circleFolder.add(circleControls.position, "y", 0.5, 3).onChange(() => {
  circle.position.y = circleControls.position.y;
});
circleFolder.add(circleControls.position, "z", -5, 5).onChange(() => {
  if (circleControls.position.z >= -5 && circleControls.position.z <= 5) {
    circle.position.z = circleControls.position.z;
  }
});
circleFolder.addColor(circleControls, "color").onChange((color) => {
  circle.material.color.set(color);
});
circleFolder.open();

// Control properties for the plane
const planeControls = {
  color: plane.material.color.getHex(),
};

gui.addColor(planeControls, "color").onChange((color) => {
  plane.material.color.set(color);
});

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
