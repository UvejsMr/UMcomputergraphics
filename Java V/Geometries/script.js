import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Plane (Surface) Geometry
const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10); // Width, Height, WidthSegments, HeightSegments
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
}); // Green surface
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI * 0.5; // Rotate the plane to lie flat on the XZ plane
plane.position.y = -1; // Position the plane slightly below the objects
scene.add(plane);

// Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 7;
camera.position.y = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

// Raycaster and Mouse Vector for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Geometry and Material for Objects
const objects = [];

// Object 1: Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 1, 0); // Position it higher on the page
scene.add(cube);
objects.push(cube);

// Object 2: Rectangle (scaled box)
const rectGeometry = new THREE.BoxGeometry(1, 0.5, 2); // Rectangle shape
const rectMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue color
const rectangle = new THREE.Mesh(rectGeometry, rectMaterial);
rectangle.position.set(-1, 1, 0);
scene.add(rectangle);
objects.push(rectangle);

// Object 3: Sphere (circle-like in 3D)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Sphere shape (close to a circle)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1, 1, 0);
scene.add(sphere);
objects.push(sphere);

// Object 4: Cylinder (like a 3D circle)
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32); // Cylinder
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Magenta color
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(3, 1, 0);
scene.add(cylinder);
objects.push(cylinder);

// Object 5: Cone
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32); // Cone shape
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Cyan color
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(5, 1, 0);
scene.add(cone);
objects.push(cone);

// Event listener for mouse clicks
window.addEventListener("click", (event) => {
  // Normalize mouse position
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  // Use raycaster to detect which object was clicked
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    // Rotate the object to the right (along the y-axis)
    clickedObject.rotation.y += Math.PI / 4; // Rotate by 45 degrees
  }
});

// Animation loop
const tick = () => {
  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame to keep the animation going
  requestAnimationFrame(tick);
};

// Start the animation
tick();
