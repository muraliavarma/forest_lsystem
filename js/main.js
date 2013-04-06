function onLoad() {
	var canvas = document.getElementById('turtleCanvas');
	var ctx = canvas.getContext('2d');
	// ctx.fillStyle = "rgba(0, 0, 255, .8)";
	// ctx.fillRect(10, 10, 480, 100);
	//draw the center of the canvas
	ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	ctx.fillRect(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 5);

	var camera = new Camera();
	var particle = new Particle([20, 0, 10]);

	particle.draw(ctx, camera);

	canvas.onmousedown = function() {
		var origX = event.clientX;
		var origY = event.clientY;
		canvas.onmousemove = function() {
			var diffX = event.clientX - origX;
			var diffY = event.clientY - origY;
			camera.rotate(diffX, diffY);
		}
	}

	canvas.onmouseup = function() {
		canvas.onmousemove = null;
	}

}
