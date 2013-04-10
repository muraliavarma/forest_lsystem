(function() {
	Turtle = function(opts) {
		this._opts = opts;
		this.name = opts.name;
		this.pos = opts.pos.clone();
		this.dir = opts.dir.clone();
		this.up = opts.up.clone();
		this.pen = opts.pen;
	};

	Turtle.prototype = {
		pos: null,
		dir: null,
		pen: null,
		_stack: [],
		_lines: {},
		run: function(cmd) {
			this._cmd = cmd;
			this._idx = 0;
			while(this._idx < cmd.length) {
				// / represents head turn, + represents up turn, & represents right turn
				switch(cmd[this._idx]) {
					case 'F':
						var oldPos = this.pos.clone();
						this.pos.add(this.dir.clone().multiplyScalar(parseFloat(this._getParam())));
						this._storeLine(oldPos, this.pos.clone());
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
					case '$':
						this.up = this.dir.clone().cross(new THREE.Vector3(0, 1, 0).cross(this.dir));
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
						this.pen.color = 0xff0000;
						this._getParam();
						break;
					case 'B':
						this.pen.color = 0x0000ee;
						this._getParam();
						break;
					case 'C':
						this.pen.color = 0x00ff00;
						this._getParam();
						break;
					case 'D':
						this.pen.color = 0xffff00;
						this._getParam();
						break;
					case '!':
						this.pen.width = parseFloat(this._getParam());
						break;
					default:
						console.log('Unrecognizable symbol in command: ' + cmd[this._idx]);
				}
				this._idx++;
			}
			this._drawLines();
			render();
		},
		reset: function() {
			this.pos = this._opts.pos.clone();
			this.dir = this._opts.dir.clone();
			this.up = this._opts.up.clone();
			this.pen = this._opts.pen;
			this._lines = {};
		},
		clear: function() {
			this.reset();
			scene.children = [];
			// render();
		},
		setPos: function(vec) {
			this.pos = vec;
			this._opts.pos = this.pos.clone();
			return this;
		},
		clone: function() {
			var opts = this._opts;
			return new Turtle({
				name: opts.name + '_clone',
				pos: opts.pos.clone(),
				dir: opts.dir.clone(),
				up:  opts.up.clone(),
				pen: {
					color: opts.pen.color,
					width: opts.pen.width
				}
			});
		},
		_storeLine: function(p1, p2) {
			var key = this.pen.color + '_' + this.pen.width;
			if (!this._lines[key]) {
				this._lines[key] = [];
			}
			this._lines[key].push(p1);
			this._lines[key].push(p2);
		},
		_drawLines: function() {
			for (var key in this._lines) {
				var keySplit = key.split('_');
				var color = keySplit[0];
				var width = keySplit[1];
				var material = new THREE.LineBasicMaterial({
					color: new THREE.Color().setHex(color),
					linewidth: width
				});
				var geometry = new THREE.Geometry();
				for (var i = 0; i < this._lines[key].length; i++) {
					geometry.vertices.push(this._lines[key][i]);
				}
				scene.add(new THREE.Line(geometry, material, THREE.LinePieces));
			}
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