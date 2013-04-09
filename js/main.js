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
		up:  new THREE.Vector3(0, 0, 1),
		pen: {
			color: 0xff00ff
		}
	});

	// / represents head turn, + represents up turn, & represents right turn
	// cmds = ['f 20', '+ 90', 'f 10', '/ 45', 'f 10', '+ -45', 'f 10'];
	// cmds = ['f 20', '/ 90', '+ 90', 'f 10', '+ -90', 'f 10'];
	// cmds = ['f 20', '& 90', '+ 90', 'f 10', '+ -90', 'f 10'];
	//stack test
	//cmds = ['f 20', '[', '+ 45', 'f 20', ']', 'f 20'];
	//snow flake test
	// cmds = ['f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2','+ -60','f 2','+ -60','f 2','+ 60','+ 60','f 2','+ -60','f 2'];
	// turtle.run(cmds);

	// turtle.reset();
	// turtle.pos.z += 100;
	// //tree test
	// cmds = ['f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']',']','+ 25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','[','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']','+ 25','[','+ 25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']','+ -25','f 5','f 5','+ -25','[','+ -25','f 5','+ 25','f 5',']','+ 25','[','+ 25','f 5','+ -25','f 5',']',']',']'];
	// turtle.run(cmds);

	var cmd = 'F(5)[&(45)F(10)+(45)F(20)]F(20)';
	turtle.run(cmd);

	container.onmousewheel = function() {
		controls.update();
	}

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