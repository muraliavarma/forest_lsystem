function onLoad() {

	isPaused = false;
	scene = new THREE.Scene();
	var fov = 75;
	var near = 1;
	var far = 100000;

	camera = new THREE.PerspectiveCamera(fov, 1, near, far);
	camera.position = new THREE.Vector3(0, 50, 100);

	var container = document.getElementById('canvasContainer');
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0x000000);
	renderer.setSize(1000, 600);
	container.appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera);
	controls.zoomSpeed = 0.1;
	controls.addEventListener('change', render);

	var env = new Environment();

	//sample l systems

	var hondaConstants = [{
		r1: 0.9,
		r2: 0.6,
		a0: 45,
		a2: 45,
		d: 137.5,
		wr: 0.707
	},{
		r1: 0.9,
		r2: 0.9,
		a0: 45,
		a2: 45,
		d: 137.5,
		wr: 0.707
	},{
		r1: 0.9,
		r2: 0.8,
		a0: 45,
		a2: 45,
		d: 137.5,
		wr: 0.707
	},{
		r1: 0.9,
		r2: 0.7,
		a0: 30,
		a2: -30,
		d: 137.5,
		wr: 0.707
	}];

	var hondas = [];

	for (var i = 0; i < 4; i ++) {
		hondas.push(new LSystem({
			maxAge: 10,
			adulthood: 10,
			axiom: 'A(1, 5)',
			constants: hondaConstants[i],
			tropism: {
				vector: new THREE.Vector3(0, -1, 0),
				e: 0.1
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
		}));
	}

	var aano = new LSystem({
		maxAge: 10,
		adulthood: 50,
		axiom: 'A(2, 5)',
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
			rhs: '!(w)L(0)F(l)[+(a1)$B(l*r1, w*wr)][+(-a2)$B(l*r2, w*wr)]'
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

	//init with a lot of trees at the start
	// while (env.trees.length < env.maxTrees) {
	// 	console.log(env.trees.length);
	// 	var turt = turtle.clone();
	// 	env.addTree(hondas[parseInt(Math.random() * 4)], turt);
	// 	env.update();
	// }

	//forest
	setInterval(function() {
		if (isPaused) {
			return;
		}
		if (env.trees.length < env.maxTrees) {
			var turt = turtle.clone();
			env.addTree(hondas[parseInt(Math.random() * 4)], turt);
		}
		env.update();
	}, 500);

	//aano
	// env.maxTrees = 1;
	// setInterval(function() {
	// 	if (isPaused) {
	// 		return;
	// 	}
	// 	if (env.trees.length < env.maxTrees) {
	// 		var turt = turtle.clone();
	// 		env.addTree(aano, turt);
	// 	}
	// 	env.update();
	// }, 500);

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

function pause() {
	isPaused = !isPaused;
}