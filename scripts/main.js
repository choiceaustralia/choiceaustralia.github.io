let renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new THREE.ObjectLoader();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

camera.position.set(5.1, 0, 15);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio || 1);
document.body.appendChild(renderer.domElement);

let earth, sun, co2, sunlight;

function update () {
    window.requestAnimationFrame(update);
    earth.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function init (obj) {
    scene.add(obj);
    earth = scene.getObjectByName('Earth');
    sun = scene.getObjectByName('Sun');
    co2 = scene.getObjectByName('CO2');
    sunlight = scene.getObjectByName('Sunlight');
    update();
}

loader.load('assets/scene.json', obj => init(obj));