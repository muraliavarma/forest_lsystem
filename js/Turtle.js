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
		run: function(cmd, opts) {
			cmd = 'A(0)' + cmd;	//to set default color to A
			this._cmd = cmd;
			this._idx = 0;
			while(this._idx < cmd.length) {
				// / represents head turn, + represents up turn, & represents right turn
				switch(cmd[this._idx]) {
					case 'F':
						var oldPos = this.pos.clone();
						if (opts && opts.tropism) {
							var cross = this.dir.clone().cross(opts.tropism.vector);
							var alpha = opts.tropism.e * cross.length();
							this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(cross, alpha));
							this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(cross, alpha));
						}
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
						this._popStack();
						break;
					case '%':
						//prune this branch
						//example: aaa[asdadasd[aa[dsd%a[s]da]bbb]ccc]asdadasd
						var ctr = 0;
						while(++this._idx < cmd.length && ctr != -1) {
							if (cmd[this._idx] == '[') {
								ctr ++;
							}
							if (cmd[this._idx] == ']') {
								ctr --;
							}
						}
						this._idx --;	//to compensate for the idx increment that happens right after all the switch cases
						this._popStack();
						break;
					case 'L':
						this.pen.color = 0x004000;
						this._getParam();
						break;
					case 'A':
						this.pen.color = 0x5c4033;
						this._getParam();
						break;
					case 'B':
						this.pen.color = 0x6c4033;
						this._getParam();
						break;
					case 'C':
						this.pen.color = 0x7c4033;
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
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshBasicMaterial({color: 0x222222}));
			plane.rotation.x = -Math.PI / 2;
			while (scene.children.length > 0) {
				scene.remove(scene.children[0]);
			}
			scene.add(plane);
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
			if (val == '') {
				//this is to compensate for idx values that get incremented in the  above if loop to get reset back
				//(used in tropism where A does not have any parameters passed into it)
				this._idx --;
			}
			return val;
		},
		_popStack: function() {
			var top = this._stack.pop();
			this.pos = top.pos;
			this.dir = top.dir;
			this.up = top.up;
		}
	};

})();