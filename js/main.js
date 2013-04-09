function onLoad() {

	scene = new THREE.Scene();
	var fov = 90;
	var near = 1;
	var far = 10000;

	camera = new THREE.PerspectiveCamera(fov, 1, near, far);
	camera.position = new THREE.Vector3(0, 0, 30);

	var container = document.getElementById('canvasContainer');
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(500, 500);
	container.appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera);
	controls.zoomSpeed = 0.1;
	controls.addEventListener('change', render);

	//honda trees
	var lsystem = new LSystem({
		iterations: 10,
		axiom: 'A(1, 10)',
		constants: {
			r1: 0.9,
			r2: 0.9,
			a0: 45,
			a2: 45,
			d: 137.5,
			wr: 0.707
		},
		rules: [{
			lhs: 'A(l, w)',
			rhs: '!(w)F(l)[&(a0)B(l*r2, w*wr)]/(d)A(l*r1, w*wr)'
		},{
			lhs: 'B(l, w)',
			rhs: '!(w)F(l)[+(-a2)$C(l*r2, w*wr)]C(l*r1, w*wr)'
		},{
			lhs: 'C(l, w)',
			rhs: '!(w)F(l)[+(a2)$B(l*r2, w*wr)]B(l*r1, w*wr)'
		}]
	});

var lsystem3 = new LSystem({
		iterations: 10,
		axiom: 'A(1, 10)',
		constants: {
			r1: 0.9,
			r2: 0.9,
			a0: 45,
			a2: 45,
			d: 137.5,
			wr: 0.707
		},
		rules: [{
			lhs: 'D(l, w)',
			rhs: '!(w)F(l)[&(a0)B(l*r2, w*wr)]/(d)D(l*r1, w*wr)'
		},{
			lhs: 'B(l, w)',
			rhs: '!(w)F(l)[+(-a2)$C(l*r2, w*wr)]C(l*r1, w*wr)'
		},{
			lhs: 'C(l, w)',
			rhs: '!(w)F(l)[+(a2)$B(l*r2, w*wr)]B(l*r1, w*wr)'
		}]
	});


	//cooler trees
	var lsystem2 = new LSystem({
		iterations: 6,
		axiom: 'A(1,10)',
		constants: {
			r1: 0.9,
			r2: 0.7,
			a1: 10,
			a2: 60,
			wr: 0.707
		},
		rules: [{
			lhs: 'A(l, w)',
			rhs: '!(w)F(l)[&(a1)B(l*r1, w*wr)]/(180)[&(a2)B(l*r2, w*wr)]'
		},{
			lhs: 'B(l, w)',
			rhs: '!(w)F(l)[+(a1)$B(l*r1,w*wr)][-(a2)$B(l*r2,w*wr)]'
		}]
	});

	var turtle = new Turtle({
		pos: new THREE.Vector3(10, 0, 0),
		dir: new THREE.Vector3(0, 1, 0),
		up:  new THREE.Vector3(0, 0, 1),
		pen: {
			color: 0xffffee,
			width: 1
		}
	});

	var turtle2 = new Turtle({
		pos: new THREE.Vector3(0, 0, 0),
		dir: new THREE.Vector3(0, 1, 0),
		up:  new THREE.Vector3(0, 0, 1),
		pen: {
			color: 0xffffee,
			width: 1
		}
	});

	lsystem.generate(turtle);
	console.log('asd');
	// lsystem3.generate(turtle2);

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