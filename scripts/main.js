// let properties = {
//     set luminance (val) { // 1232 (400) - 1368 (now)

//     }

//     set co2 (val) { // 2000 (400) - 280 (now)

//     }
// }

// var data = {
//   "Time Mybp": [400,350,300,250,200,150,100,50,0],
//   "CO2 ppm": [2000,1700,1500,1250,1000,820,640,460,280],
//   "Solar watts m2": [1232,1249,1266,1283,1300,1317,1334,1351,1368]
// };

let maxYear = 0;
let minYear = -400;

window.onload = () => {

    let container = document.getElementById('graphics');

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    let loader = new THREE.ObjectLoader();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 1, 10000);
    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set(0, 0, 15);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.domElement.style.width = '100%'; //temp can set with CSS
    renderer.domElement.style.height = '100%'; //temp can set with CSS
    container.appendChild(renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 2000;

    let earth, sun, co2, sunlight, sunBaseColor;

    function update () {
        window.requestAnimationFrame(update);
        earth.rotation.y += 0.005;
        sun.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    function onResize () {
        renderer.setSize(container.clientWidth, container.clientHeight, false);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    }

    function init (obj) {
        scene.add(obj);
        earth = scene.getObjectByName('Earth');
        sun = scene.getObjectByName('Sun');
        sunglow = scene.getObjectByName('Sunglow');
        co2 = scene.getObjectByName('CO2');
        sunlight = scene.getObjectByName('Sunlight');
        sunBaseColor = sun.material.color.clone();

        co2.material = THREEx.createAtmosphereMaterial();
        co2.material.uniforms.glowColor.value = new THREE.Color('cyan');

        update();
    }

    window.addEventListener('resize', onResize);
    loader.load('assets/scene.json', obj => init(obj));

    document.querySelector('#time-slider').addEventListener('input', e => {
        setLuminance(Number(e.target.value));
        setCo2(Number(e.target.value));
    });

    function setLuminance (val) {
        let colorScale = (val - minYear) / (maxYear - minYear) * 1 + 1;
        let glowScale = (val - minYear) / (maxYear - minYear) * 3 + 3;
        sunglow.scale.set(glowScale, glowScale, glowScale);
        sun.material.color.copy(sunBaseColor).multiplyScalar(colorScale);
    }

    function setCo2 (val) {
        let co2Size = -(val - minYear) / (maxYear - minYear) * 0.25 + 1.35;
        let co2Coefficient = -(val - minYear) / (maxYear - minYear) * 0.5 + 1.0;
        co2.scale.set(co2Size, co2Size, co2Size);
        co2.material.uniforms.coeficient.value = co2Coefficient;
        // co2.material.uniforms.power.value = 1.4
    }

    window.setLuminance = setLuminance;
    window.setCo2 = setCo2;
}