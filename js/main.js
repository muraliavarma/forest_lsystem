function onLoad() {

	scene = new THREE.Scene();
	var fov = 90;
	var near = 1;
	var far = 1000;

	camera = new THREE.PerspectiveCamera(fov, 1, near, far);
	camera.position = new THREE.Vector3(0, 0, 100);

	var container = document.getElementById('canvasContainer');
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(500, 500);
	container.appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera);
	controls.zoomSpeed = 0.1;
	controls.addEventListener('change', render);

	turtle = new Turtle({
		pos: new THREE.Vector3(0, 0, -10),
		dir: new THREE.Vector3(0, 1, 0),
		pen: {
			color: 0xff00ff
		}
	});

	cmds = ['f 20', 'r 90', 'f 10', 'l 45', 'f 10'];
	turtle.run(cmds);

	// var material = new THREE.LineBasicMaterial({
	// 	color: 0xff00ff,
	// });
	// var geometry = new THREE.Geometry();
	// geometry.vertices.push(new THREE.Vector3(-10, 0, -10));
	// geometry.vertices.push(new THREE.Vector3(0, 10, -10));
	// geometry.vertices.push(new THREE.Vector3(30, 0, -10));

	// var line = new THREE.Line(geometry, material);
	// scene.add(line);

	container.onmousedown = function() {
		container.onmousemove = function() {
			controls.update();
		}
	}
	container.onmouseup = function() {
		container.onmousemove = null;		
	}

	render();
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}