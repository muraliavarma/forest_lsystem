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
		_stack: [],
		run: function(cmd) {
			this._cmd = cmd;
			this._idx = 0;
			while(this._idx < cmd.length) {
				switch(cmd[this._idx]) {
					case 'F':
						var oldPos = this.pos.clone();
						this.pos.add(this.dir.clone().multiplyScalar(parseFloat(this._getParam())));
						this._draw(oldPos, this.pos.clone());
						break;
					case '+':
						var rad = parseFloat(this._getParam() * Math.PI / 180);
						this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.up, rad));
						this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.up, rad));
						break;
					case '/':
						var rad = parseFloat(this._getParam() * Math.PI / 180);
						this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.dir, rad));
						this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.dir, rad));
						break;
					case '&':
						var rad = parseFloat(this._getParam() * Math.PI / 180);
						var right = this.dir.clone().cross(this.up);
						this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(right, rad));
						this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(right, rad));
						break;
					case '[':
						this._stack.push({
							pos: this.pos.clone(),
							dir: this.dir.clone(),
							up: this.up.clone()
						})
						break;
					case ']':
						var top = this._stack.pop();
						this.pos = top.pos;
						this.dir = top.dir;
						this.up = top.up;
						break;
					case 'A':
						this.pen.color = 0xffffff;
						break;

					default:
						console.log('Unrecognizable symbol in command: ' + cmd[this._idx]);
				}
				this._idx++;
			}
		},
		reset: function() {
			this.pos = new THREE.Vector3(0, 0, 0),
			this.dir = new THREE.Vector3(0, 1, 0),
			this.up = new THREE.Vector3(0, 0, 1)
		},
		_draw: function(p1, p2) {	
			//needs to be optimized. use LinePieces maybe?	
			var material = new THREE.LineBasicMaterial({
				color: this.pen.color,
			});
			var geometry = new THREE.Geometry();
			geometry.vertices.push(p1);
			geometry.vertices.push(p2);
			var line = new THREE.Line(geometry, material);
			scene.add(line);
		},
		_getParam: function() {
			var val = '';
			if (this._cmd[++this._idx] == '(') {
				while (this._cmd[++this._idx] != ')') {
					val += this._cmd[this._idx];
				}
			}
			return val;
		}
	};

})();