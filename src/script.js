import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Size
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Object
/**
 * Objects
 */
 const group = new THREE.Group()
 group.scale.y = 2
 group.rotation.y = 0.2
 scene.add(group)
 
 const cube1 = new THREE.Mesh(
     new THREE.BoxGeometry(1, 1, 1),
     new THREE.MeshBasicMaterial({ color: 0xff0000 })
 )
 cube1.position.x = - 1.5
 group.add(cube1)
 
 const cube2 = new THREE.Mesh(
     new THREE.BoxGeometry(1, 1, 1),
     new THREE.MeshBasicMaterial({ color: 0xff0000 })
 )
 cube2.position.x = 0
 group.add(cube2)
 
 const cube3 = new THREE.Mesh(
     new THREE.BoxGeometry(1, 1, 1),
     new THREE.MeshBasicMaterial({ color: 0xff0000 })
 )
 cube3.position.x = 1.5
 group.add(cube3)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(cube2.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
