function onLoad() {

	scene = new THREE.Scene();
	var fov = 90;
	var near = 1;
	var far = 1000;

	camera = new THREE.PerspectiveCamera(fov, 1, near, far);
	// camera.lookAt(new THREE.Vector3(0, 0, -100));
	camera.position = new THREE.Vector3(0, 0, 100);

	var container = document.getElementById('canvasContainer');
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(500, 500);
	container.appendChild(renderer.domElement);


	controls = new THREE.TrackballControls(camera);
	controls.target.set(0, 0, 0);
	// controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 0.1;
	// controls.panSpeed = 2;
	// controls.noZoom = false;
	// controls.noPan = false;
	// controls.staticMoving = true;
	// controls.dynamicDampingFactor = 0.3;
	controls.addEventListener('change', render);


	var material = new THREE.LineBasicMaterial({
		color: 0xff00ff,
	});
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10, 0, -10));
	geometry.vertices.push(new THREE.Vector3(0, 10, -10));
	geometry.vertices.push(new THREE.Vector3(30, 0, -10));

	var line = new THREE.Line(geometry, material);
	scene.add(line);
	animate();
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	controls.update();
	requestAnimationFrame(animate);
	render();
}