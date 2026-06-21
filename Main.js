import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// --- 1. CONFIGURACIÓN BÁSICA ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);
scene.fog = new THREE.Fog(0x111122, 0, 100);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Activa el soporte para WebXR (Oculus)
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
light.position.set(0, 20, 0);
scene.add(light);

// --- 2. MUNDO Y OBSTÁCULOS ---
const gridHelper = new THREE.GridHelper(200, 100, 0x00ffcc, 0x444444);
scene.add(gridHelper);

const solidMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const boxes = [];
for (let i = 0; i < 20; i++) {
    const boxGeo = new THREE.BoxGeometry(5, Math.random() * 10 + 2, 5);
    const box = new THREE.Mesh(boxGeo, solidMaterial);
    box.position.set((Math.random() - 0.5) * 100, boxGeo.parameters.height / 2, (Math.random() - 0.5) * 100);
    scene.add(box);
    boxes.push(box);
}

// --- 3. CONTROLES Y FÍSICAS ---
const controls = new PointerLockControls(camera, document.body);
const instructions = document.getElementById('instructions');

instructions.addEventListener('click', () => controls.lock());
controls.addEventListener('lock', () => instructions.style.display = 'none');
controls.addEventListener('unlock', () => instructions.style.display = 'block');

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = false;
let isDashing = false;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyD': moveRight =

