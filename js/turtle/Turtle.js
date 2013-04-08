(function() {
	Turtle = function(opts) {
		this.pos = opts.pos;
		this.dir = opts.dir;
		this.up = opts.up;
		this.pen = opts.pen;
	};

	Turtle.prototype = {
		pos: null,
		dir: null,
		pen: null,
		run: function(cmds) {
			for (var i = 0; i < cmds.length; i++) {
				var cmd = cmds[i];
				if (cmd.indexOf('f') == 0) {
					var oldPos = this.pos.clone();
					this.pos.add(this.dir.clone().multiplyScalar(parseInt(cmd.substr(2))));
					this.draw(oldPos, this.pos.clone());
				}
				else if (cmd.indexOf('+') == 0) {
					var rad = parseFloat(cmd.substr(2) * Math.PI / 180);
					this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.up, rad));
					this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.up, rad));
				}
				else if (cmd.indexOf('/') == 0) {
					var rad = parseFloat(cmd.substr(2) * Math.PI / 180);
					this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.dir, rad));
					this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.dir, rad));
				}
				else if (cmd.indexOf('&') == 0) {
					var rad = parseFloat(cmd.substr(2) * Math.PI / 180);
					var right = this.dir.clone().cross(this.up);
					this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(right, rad));
					this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(right, rad));
				}
			}
		},
		draw: function(p1, p2) {	
			//needs to be optimized. use LinePieces maybe?	
			var material = new THREE.LineBasicMaterial({
				color: 0xffffff,
			});
			var geometry = new THREE.Geometry();
			geometry.vertices.push(p1);
			geometry.vertices.push(p2);
			var line = new THREE.Line(geometry, material);
			scene.add(line);
		}
	};

})();