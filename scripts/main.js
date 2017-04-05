window.onload = () => {

    let container = document.getElementById('graphics');

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    let loader = new THREE.ObjectLoader();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 1000);

    camera.position.set(5.1, 0, 15);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    let earth, sun, co2, sunlight;

    function update () {
        window.requestAnimationFrame(update);
        earth.rotation.y += 0.005;
        sun.rotation.y -= 0.002;
        renderer.render(scene, camera);
    }

    function onResize () {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    }

    function init (obj) {
        scene.add(obj);
        earth = scene.getObjectByName('Earth');
        sun = scene.getObjectByName('Sun');
        co2 = scene.getObjectByName('CO2');
        sunlight = scene.getObjectByName('Sunlight');
        update();
    }

    window.addEventListener('resize', onResize);
    loader.load('assets/scene.json', obj => init(obj));
}