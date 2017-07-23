
console.log(":)");
// Creamos una escena, donde colocaremos los objetos
let scene = new THREE.Scene();


// Box Geometry para crear cubos
let geometry = new THREE.BoxGeometry( 20, 20, 20 );
// Material
let groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x222222
});

mesh = new THREE.Mesh(geometry,groundMaterial);
// Crear nuevo plano
let planeGeometry  = new THREE.PlaneGeometry(200, 900);

planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));

let planeMesh = new THREE.Mesh(planeGeometry, groundMaterial);
planeMesh.receiveShadow = true;

// Agregamos el elemento a la escena
// scene.add(mesh);

// Creamos una cámara, son nuestros ojos en la escena
const aspectRatio = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75,aspectRatio,0.1,100);

camera.position.z = 40;
camera.position.y = 2;

// Crear un point light
let pointLight = new THREE.PointLight(0xdfebff);

pointLight.position.y = 100;
pointLight.position.z = 20;

pointLight.castShadow = true;

scene.add(pointLight);

scene.add(new THREE.AmbientLight( 0x404040 ));

scene.add(planeMesh);

let helper = new THREE.CameraHelper( pointLight.shadow.camera );
scene.add( helper );

scene.background = new THREE.Color( 0xeeeeee );
// Creamos el render, WebGLRenderer es uno de ellos, otros se usan para compatibilidad
// El render es quien construye los gráficos
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Agregamos el canvas del renderer al body de la app
document.body.appendChild(renderer.domElement);

// Configurar orbit controls
controls = new THREE.OrbitControls(camera, renderer.domElement );


let loader = new THREE.TextureLoader();

loader.load('texture.jpg', function ( texture ) {
	// Geometría de la esfera
	let geometry = new THREE.SphereGeometry(20,100,100);

	// Material
	let material = new THREE.MeshBasicMaterial({map: texture});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.y = 25;
	mesh.position.z = 0;
	mesh.castShadow = true;


	scene.add(mesh);
});

function loop(){
	requestAnimationFrame(loop);
	mesh.rotation.y += 0.01;
	renderer.render(scene,camera);
}


loop();
