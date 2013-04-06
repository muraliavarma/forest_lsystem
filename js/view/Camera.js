(function() {
	Camera = function() {
		// if (pos) {
		// 	this.pos = Vector.create(pos);
		// }
		// if (up) {
		// 	this.up = Vector.create(up);
		// }
		// if (look) {
		// 	this.look = Vector.create(look);
		// }
		// if (height) {
		// 	this.height = height;
		// }
		// if (width) {
		// 	this.width = width;
		// }
		this.calcProjectionMatrix();
		this.calcLookAtMatrix();
	};

	Camera.prototype = {
		pos: vec3.clone([0, 0, 0]),
		up: vec3.clone([0, -1, 0]),
		look: vec3.clone([20, 0, 5]),
		height: 300,
		width: 300,
		near: 1,
		far: 1000,
		fov: 90,
		projectionMatrix: mat4.create(),
		lookAtMatrix: mat4.create(),

		pan: function(x, y) {

		},

		rotate: function(x, y) {
			
		},

		zoom: function(ratio) {

		},

		calcProjectionMatrix: function() {
			mat4.perspective(this.projectionMatrix, this.fov * Math.PI / 180, this.width/this.height, this.near, this.far);
		},

		calcLookAtMatrix: function() {
			mat4.lookAt(this.lookAtMatrix, this.pos, this.look, this.up)
		}
	}

})();