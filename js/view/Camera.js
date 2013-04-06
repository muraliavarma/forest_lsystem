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
		look: vec3.clone([0, 0, 100]),
		height: 300,
		width: 300,
		near: 1,
		far: 1000,
		fov: 90,
		zoom: 1,

		projectionMatrix: mat4.create(),
		lookAtMatrix: mat4.create(),

		doPan: function(ox, oy, olx, oly, dx, dy) {
			this.pos[0] = ox + dx;
			this.pos[1] = oy - dy;
			this.look[0] = olx + dx;
			this.look[1] = oly - dy;
			this.calcLookAtMatrix();
		},

		doRotate: function(ox, oy, dx, dy) {
			this.pos[0] = ox + dx;
			this.pos[1] = oy - dy;
			this.calcLookAtMatrix();
		},

		doZoom: function(val) {
			this.zoom += val;
			this.zoom = Math.max(0.1, Math.min(this.zoom, 1.5));
			this.calcProjectionMatrix();
		},

		calcProjectionMatrix: function() {
			mat4.perspective(this.projectionMatrix, this.zoom * this.fov * Math.PI / 180, this.width/this.height, this.near, this.far);
		},

		calcLookAtMatrix: function() {
			mat4.lookAt(this.lookAtMatrix, this.pos, this.look, this.up)
		}
	}

})();