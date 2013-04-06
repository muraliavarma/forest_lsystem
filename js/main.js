var isRotate = false;

function onLoad() {
	var canvas = document.getElementById('turtleCanvas');
	var ctx = canvas.getContext('2d');
	// ctx.fillStyle = "rgba(0, 0, 255, .8)";
	// ctx.fillRect(10, 10, 480, 100);
	//draw the center of the canvas
	// ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	// ctx.fillRect(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 5);

	var particle = new Particle([20, 0, 0]);
	var particle2 = new Particle([-20, 0, 0]);
	var particle3 = new Particle([-20, 30, 0]);
	var particle4 = new Particle([20, 30, 0]);

	var scene = new Scene();
	var camera = new Camera();
	scene.setCamera(camera);
	scene.setCtx(ctx);
	scene.setParticles([particle, particle2, particle3, particle4]);
	scene.draw();

	// particle.draw(ctx, camera);
	// particle2.draw(ctx, camera);
	// particle3.draw(ctx, camera);
	// particle4.draw(ctx, camera);

	canvas.onmousedown = function() {
		var origX = event.clientX;
		var origY = event.clientY;
		var origPosX = camera.pos[0];
		var origPosY = camera.pos[1];
		var origLookX = camera.look[0];
		var origLookY = camera.look[1];
		canvas.onmousemove = function() {
			var diffX = event.clientX - origX;
			var diffY = event.clientY - origY;


			if (isRotate) {
				camera.doRotate(origPosX, origPosY, diffX, diffY);
			}
			else {
				camera.doPan(origPosX, origPosY, origLookX, origLookY, diffX, diffY);
			}

			scene.draw();
		}
	}

	canvas.onmouseup = function() {
		canvas.onmousemove = null;
	}

	canvas.onmousewheel = function(e) {
		e.preventDefault();
		camera.doZoom(-e.wheelDelta/1000);
		scene.draw()
	}

	document.onkeypress = function(e) {
		console.log(e.which);
		if (e.which == 114 || e.which == 82) {
			//r key or R key
			isRotate = !isRotate;
		}
	}

}
