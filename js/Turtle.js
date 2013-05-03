(function() {
	Turtle = function(opts) {
		this._opts = opts;
		this.name = opts.name;
		this.pos = opts.pos.clone();
		this.dir = opts.dir.clone();
		this.up = opts.up.clone();
		this.pen = opts.pen;
		this._sceneChildren = [];
		this.idx = -1;
		this.results = [];
		this.birth = 0;
		this.age = -1;
		this.remainingLife = -1;
		this.adulthood = -1;
	};

	Turtle.prototype = {
		idx: -1,
		pos: null,
		dir: null,
		pen: null,
		_stack: [],
		_lines: {},
		_sceneChildren: [],
		results: [],
		run: function(cmd, opts) {
			this.age ++;
			cmd = 'A(0)' + cmd;	//to set default color to A
			this._cmd = cmd;
			this._idx = 0;
			while(this._idx < cmd.length) {
				// / represents head turn, + represents up turn, & represents right turn
				switch(cmd[this._idx]) {
					case 'F':
						var oldPos = this.pos.clone();
						var growth = 1;
						if (opts) {
							if (opts.tropism) {
								var cross = this.dir.clone().cross(opts.tropism.vector);
								var alpha = opts.tropism.e * cross.length();
								this.dir.applyMatrix4(new THREE.Matrix4().makeRotationAxis(cross, alpha));
								this.up.applyMatrix4(new THREE.Matrix4().makeRotationAxis(cross, alpha));
							}
							if (opts.growth) {
								growth = opts.growth;
							}
						}
						this.pos.add(this.dir.clone().multiplyScalar(growth * parseFloat(this._getParam())));
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
						// if (this.remainingLife == this.adulthood) {
							this.pen.color = '#004000';
						// }
						// else {
						// 	if (2 * this.remainingLife < this.adulthood) {
						// 		this.pen.color = '#301000';
						// 	}
						// 	else {
						// 		this.pen.color = '#202000';
						// 	}
							// var r = parseInt(64 * (1 - this.remainingLife / this.adulthood));
							// var g = parseInt(16 + 48 * (this.remainingLife / this.adulthood));
						// }
						this._getParam();
						break;
					case 'A':
						this.pen.color = '#3c2013';
						this._getParam();
						break;
					case 'B':
						this.pen.color = '#3c2013';
						// this.pen.color = 0x6c4033;
						this._getParam();
						break;
					case 'C':
						this.pen.color = '#3c2013';
						// this.pen.color = 0x7c4033;
						this._getParam();
						break;
					case 'D':
						this.pen.color = '#ffff00';
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
			while (this._sceneChildren.length > 0) {
				var sceneChild = this._sceneChildren.pop();
				scene.remove(sceneChild);
			}
			render();
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
		ageLeaves: function() {
			for (var i = 0; i < this._sceneChildren.length; i++) {
				if (2 * this.remainingLife < this.adulthood) {
					this._sceneChildren[i].material.color.setHex(0x301000);
				}
				else {
					this._sceneChildren[i].material.color.setHex(0x202000);
				}
			}
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
					color: new THREE.Color().setStyle(color),
					linewidth: width
				});
				var geometry = new THREE.Geometry();
				for (var i = 0; i < this._lines[key].length; i++) {
					geometry.vertices.push(this._lines[key][i]);
				}
				var line = new THREE.Line(geometry, material, THREE.LinePieces)
				this._sceneChildren.push(line);
				scene.add(line);
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