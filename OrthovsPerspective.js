import * as THREE from 'https://unpkg.com/three@0.167.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.167.1/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

// =====================================================
// Cameras
// =====================================================

const perspectiveCamera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

perspectiveCamera.position.set(8, 6, 10);
perspectiveCamera.lookAt(0, 0, 0);

const aspect =
    window.innerWidth / window.innerHeight;

const orthoSize = 8;

const orthographicCamera =
    new THREE.OrthographicCamera(
        -orthoSize * aspect,
        orthoSize * aspect,
         orthoSize,
        -orthoSize,
         0.1,
         100
    );

orthographicCamera.position.set(8, 6, 10);
orthographicCamera.lookAt(0, 0, 0);

let activeCamera = perspectiveCamera;

// Controls
let controls =
    new OrbitControls(
        activeCamera,
        renderer.domElement
    );

controls.enableDamping = true;

// =====================================================
// Lighting
// =====================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

scene.add(ambientLight);

const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(directionalLight);

// =====================================================
// Objects At Different Depths
// =====================================================

const material1 =
    new THREE.MeshStandardMaterial({
        color: 0xff4444
    });

const material2 =
    new THREE.MeshStandardMaterial({
        color: 0x44ff44
    });

const material3 =
    new THREE.MeshStandardMaterial({
        color: 0x4444ff
    });

const geometry =
    new THREE.BoxGeometry(2, 2, 2);

// Near cube
const cube1 =
    new THREE.Mesh(
        geometry,
        material1
    );

cube1.position.set(-4, 0, 0);

scene.add(cube1);

// Medium distance cube
const cube2 =
    new THREE.Mesh(
        geometry,
        material2
    );

cube2.position.set(0, 0, -10);

scene.add(cube2);

// Far cube
const cube3 =
    new THREE.Mesh(
        geometry,
        material3
    );

cube3.position.set(4, 0, -20);

scene.add(cube3);

// Grid
const grid =
    new THREE.GridHelper(
        50,
        50
    );

scene.add(grid);

// =====================================================
// Toggle Camera
// =====================================================

const button =
    document.getElementById(
        "toggleBtn"
    );

const label =
    document.getElementById(
        "cameraType"
    );

button.addEventListener(
    "click",
    () => {

        if (
            activeCamera ===
            perspectiveCamera
        ) {

            orthographicCamera.position.copy(
                perspectiveCamera.position
            );

            orthographicCamera.lookAt(
                0,
                0,
                0
            );

            activeCamera =
                orthographicCamera;

            button.textContent =
                "Switch to Perspective";

            label.textContent =
                "Current Camera: Orthographic";

        }
        else {

            perspectiveCamera.position.copy(
                orthographicCamera.position
            );

            perspectiveCamera.lookAt(
                0,
                0,
                0
            );

            activeCamera =
                perspectiveCamera;

            button.textContent =
                "Switch to Orthographic";

            label.textContent =
                "Current Camera: Perspective";
        }

        controls.dispose();

        controls =
            new OrbitControls(
                activeCamera,
                renderer.domElement
            );

        controls.enableDamping = true;
    }
);

// =====================================================
// Resize
// =====================================================

window.addEventListener(
    "resize",
    () => {

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        perspectiveCamera.aspect =
            window.innerWidth /
            window.innerHeight;

        perspectiveCamera.updateProjectionMatrix();

        const aspect =
            window.innerWidth /
            window.innerHeight;

        orthographicCamera.left =
            -orthoSize * aspect;

        orthographicCamera.right =
             orthoSize * aspect;

        orthographicCamera.top =
             orthoSize;

        orthographicCamera.bottom =
            -orthoSize;

        orthographicCamera.updateProjectionMatrix();
    }
);

// =====================================================
// Animation Loop
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );

    cube1.rotation.y += 0.01;
    cube2.rotation.y += 0.01;
    cube3.rotation.y += 0.01;

    controls.update();

    renderer.render(
        scene,
        activeCamera
    );
}

animate();