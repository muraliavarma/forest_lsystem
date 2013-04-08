(function() {
	Turtle = function(opts) {
		this.pos = opts.pos;
		this.dir = opts.dir;
		this.pen = opts.pen;
	};

	Turtle.prototype = {
		pos: null,
		dir: null,
		pen: null,
		run: function(cmds) {
			for (var i = 0; i < cmds.length; i++) {
				var cmd = cmds[i];
				if (cmd.indexOf('f') >= 0) {
					var oldPos = this.pos.clone();
					this.pos.add(this.dir.clone().multiplyScalar(parseInt(cmd.substr(2))));
					this.draw(oldPos, this.pos.clone());
				}
				else if (cmd.indexOf('r') >= 0) {
					var rad = parseFloat(cmd.substr(2) * Math.PI / 180);
					this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, -1), rad));
				}
				else if (cmd.indexOf('l') >= 0) {
					var rad = -1 * parseFloat(cmd.substr(2) * Math.PI / 180);
					this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, -1), rad));
				}
			}
		},
		draw: function(p1, p2) {		
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