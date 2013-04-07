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
		look: vec3.clone([0, 0, 10]),
		height: 300,
		width: 300,
		near: 1,
		far: 1000,
		fov: 90,
		zoom: 1,

		projectionMatrix: mat4.create(),
		lookAtMatrix: mat4.create(),

		doPan: function(oPos, oLook, dx, dy) {
			this.pos[0] = oPos[0] + dx;
			this.pos[1] = oPos[1] - dy;
			this.look[0] = oLook[0] + dx;
			this.look[1] = oLook[1] - dy;
			this.calcLookAtMatrix();
		},

		doRotate: function(oPos, oLook, xTheta, yTheta) {
			var m = mat4.create();
			var negLook = vec3.create();
			vec3.negate(negLook, oLook);
			mat4.translate(m, m, negLook);
			// mat4.rotateZ(m, m, -yTheta * Math.PI / 180);
			mat4.rotateY(m, m, xTheta * Math.PI / 180);
			mat4.translate(m, m, oLook);
			vec3.transformMat4(this.pos, oPos, m)

			// console.log(this.pos[2], oPos[2]);
			console.log(xTheta);
			// xTheta *= Math.PI / 180;
			// yTheta *= Math.PI / 180;

			// this.pos[0] = oPos[0] + oLook[0] + r * Math.sin(xTheta);
			// // this.pos[1] = oly + r * Math.sin(yTheta);
			// this.pos[2] = oPos[2] + oLook[2] - r * Math.cos(xTheta);
			// this.pos[1] = oy - dy;
			this.calcLookAtMatrix();
		},

		// doRotate: function(olx, oly, olz, r, xTheta, yTheta) {
		// 	console.log(xTheta, this.pos, this.look);
		// 	xTheta *= Math.PI / 180;
		// 	yTheta *= Math.PI / 180;
		// 	this.pos[0] = olx + r * Math.sin(xTheta);
		// 	this.pos[1] = oly + r * Math.sin(yTheta);
		// 	this.pos[2] = olz + r * Math.cos(xTheta);
		// 	// this.pos[1] = oy - dy;
		// 	this.calcLookAtMatrix();
		// },

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