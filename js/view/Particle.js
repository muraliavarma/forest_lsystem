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
			ctx.fillStyle = 'rgba(100, 100, 100, 1)';
			var screenVector = vec3.create();
			vec3.transformMat4(screenVector, this.pos, camera.projectionMatrix);
			vec3.transformMat4(screenVector, screenVector, camera.lookAtMatrix);
			vec3.add(screenVector, screenVector, vec3.clone([ctx.canvas.width / 2, ctx.canvas.height / 2, 0]));
			console.log(screenVector);
			ctx.fillRect(screenVector[0], screenVector[1], 5, 5);
		}
	}

})();