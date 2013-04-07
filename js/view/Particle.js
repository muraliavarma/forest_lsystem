(function() {
	Particle = function(pos) {
		if (pos) {
			this.pos = vec3.clone(pos);
		}
	};

	Particle.prototype = {
		pos:  vec3.clone([0, 0, 0]),
		matrix: mat4.identity(mat4.create()),
		// move: function(vector) {
		// 	this.matrix = Matrix.create([
		// 		[1, 0, 0, vector.e(1)],
		// 		[0, 1, 0, vector.e(2)],
		// 		[0, 0, 1, vector.e(3)],
		// 		[0, 0, 0, 1]
		// 	]);
		// },
		draw: function (ctx, camera) {
			var screenVector = vec3.create();
			vec3.transformMat4(screenVector, this.pos, camera.lookAtMatrix);
			vec3.transformMat4(screenVector, screenVector, camera.projectionMatrix);
			vec3.add(screenVector, screenVector, vec3.clone([ctx.canvas.width / 2, ctx.canvas.height / 2, 0]));
			// console.log(screenVector);
			if (screenVector[2] > 0) {
				ctx.fillStyle = 'rgba(100, 0, 0, 1)';
			}
			else {
				ctx.fillStyle = 'rgba(0, 0, ' + parseInt(screenVector[2]) * 10 + ', 1)';
			}
			var side = 100/Math.sqrt(screenVector[2]);
			ctx.fillRect(screenVector[0] - side / 2, screenVector[1] - side / 2, side , side);
		}
	}

})();