function onLoad() {

	scene = new THREE.Scene();
	var fov = 90;
	var near = 1;
	var far = 100000;

	camera = new THREE.PerspectiveCamera(fov, 1, near, far);
	camera.position = new THREE.Vector3(0, 50, 100);

	var container = document.getElementById('canvasContainer');
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0x228888);
	renderer.setSize(500, 500);
	container.appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera);
	controls.zoomSpeed = 0.1;
	controls.addEventListener('change', render);

	var env = new Environment();

	//sample l systems
	var honda = new LSystem({
		maxAge: 10,
		axiom: 'A(1, 10)',
		constants: {
			r1: 0.9,
			r2: 0.6,
			a0: 45,
			a2: 45,
			d: 137.5,
			wr: 0.707
		},
		tropism: {
			vector: new THREE.Vector3(0, -1, 0),
			e: 0.27
		},
		growth: 5,
		rules: [{
			lhs: 'A(l, w)',
			rhs: '!(w)F(l)[&(a0)B(l*r2, w*wr)]/(d)A(l*r1, w*wr)'
		},{
			lhs: 'B(l, w)',
			rhs: '!(w)L(0)F(l)[+(-a2)$C(l*r2, w*wr)]C(l*r1, w*wr)'
		},{
			lhs: 'C(l, w)',
			rhs: '!(w)L(0)F(l)[+(a2)$B(l*r2, w*wr)]B(l*r1, w*wr)'
		}]
	});

	var aano = new LSystem({
		maxAge: 10,
		axiom: 'A(2, 10)',
		constants: {
			r1: 0.9,
			r2: 0.8,
			a1: 35,
			a2: 35,
			wr: 0.707
		},
		tropism: {
			vector: new THREE.Vector3(0, -1, 0),
			e: 0.27
		},
		growth: 5,
		rules: [{
			lhs: 'A(l, w)',
			rhs: '!(w)F(l)[&(a1)B(l*r1, w*wr)]/(180)[&(a2)B(l*r2, w*wr)]'
		},{
			lhs: 'B(l, w)',
			rhs: '!(w)F(l)[+(a1)$B(l*r1, w*wr)][+(-a2)$B(l*r2, w*wr)]'
		}]
	});

	// looks like this l system defined in ABoP has some incorrect params
	// var ternary = new LSystem({
	// 	iterations: 8,
	// 	axiom: '!(1)F(200)/(45)A',
	// 	constants: {
	// 		d1: 112.50,
	// 		d2: 157.50,
	// 		a: 30.50,
	// 		lr: 1.390,
	// 		vr: 1.332
	// 	},
	// 	tropism: {
	// 		vector: new THREE.Vector3(-0.02, -1, 0),
	// 		e: 0.27
	// 	},
	// 	rules: [{
	// 		lhs: 'A',
	// 		rhs: '!(vr)F(50)[&(a)F(50)A]/(d1)[&(a)F(50)A]/(d2)[&(a)F(50)A]'
	// 	},{
	// 		lhs: 'F(l)',
	// 		rhs: 'F(l*lr)'
	// 	},{
	// 		lhs: '!(w)',
	// 		rhs: '!(w*vr)'
	// 	}]
	// });

	// var tropismTree = new LSystem({
	// 	iterations: 12,
	// 	env: env,
	// 	axiom: 'A(1, 5)',
	// 	constants: {
	// 		r1: 0.9,
	// 		r2: 0.8,
	// 		a1: 35,
	// 		a2: 35,
	// 		wr: 0.707
	// 	},
	// 	tropism: {
	// 		vector: new THREE.Vector3(0, -1, 0),
	// 		e: 0.1
	// 	},
	// 	rules: [{
	// 		lhs: 'A(s, w)',
	// 		rhs: '!(w)F(s)[+(30)/(137)A(s*0.8, w*0.8)][+(-10)/(-90)A(s*0.9, w*0.8)]'
	// 	}]
	// });

	var turtle = new Turtle({
		name: 't1',
		pos: new THREE.Vector3(0, 0, 0),
		dir: new THREE.Vector3(0, 1, 0),
		up:  new THREE.Vector3(0, 0, 1),
		pen: {
			width: 1
		}
	});

	// for (var i = 0; i < 3; i++) {
	// 	for (var j = 0; j < 2; j++) {
	// 		env.addTree(honda, turtle.clone().setPos(new THREE.Vector3(6 - i, 0, j)));
	// 	}
	// }

	// var i = 0, j = 0, done = false;

	setInterval(function() {
		// if (j == 2) {
		// 	j = 0;
		// 	i ++;
		// }
		// if (i >= 3) {
		// 	done = true;
		// }
		// j ++;
		// if (!done) {
		if (env.trees.length < env.maxTrees) {
			var turt = turtle.clone();
			env.addTree(honda, turt);
			// console.log('tree created at', turt.pos);
		}
		env.update();
	}, 500);

	// env.addTree(honda, turtle);
	// env.addTree(honda.clone(), turtle.clone().setPos(new THREE.Vector3(10, 0, 0)));
	
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