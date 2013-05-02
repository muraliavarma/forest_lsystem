(function() {
	Environment = function() {
		this._maxTrees = 25;
		this._currIdx = 0;
		this.age = 0;
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshBasicMaterial({color: 0x222222}));
		plane.rotation.x = -Math.PI / 2;
		scene.add(plane);
	};

	Environment.prototype = {
		trees: [],
		age: 0,
		_maxTrees: 0,
		interpret: function(str) {
			var res = '';
			for (var i = 0; i < str.length; i++) {
				//mark the innermost branch as leaves
				if (false /*str[i] == ']'*/) {
					var branch = ']';
					for (var j = i - 1; j >= 0; j--) {
						if (str[j] == ']') {
							//then this is not the innermost branch
							res += ']';
							break;
						}
						else if (str[j] == '[') {
							res = str.substr(0, j + 1) + branch;
							break;
						}
						else if (str[j] == 'A' || str[j] == 'B' || str[j] == 'C') {
							branch = 'L' + branch + 'F(1)' + str[j];
						}
						else {
							branch = str[j] + branch;
						}
					}
				}
				else {
					res += str[i];
				}
			}
			return res;
		},
		addTree: function(tree, turtle) {
			turtle.idx = this._currIdx ++;
			this.trees.push({
				tree: tree,
				turtle: turtle
			});
			tree.generate(turtle);
		},
		removeTree: function(idx) {
			var index = -1;
			for (var i = 0; i < this.trees.length; i++) {
				if (this.trees[i].turtle.idx == idx) {
					index = idx;
					break;
				}
			}
			this.trees.splice(index, 1);
		},
		run: function() {
			var removeList = [];
			for (var i = 0; i < this.trees.length; i++) {
				var turtle = this.trees[i].turtle;
				var idx = this.age - turtle.birth;
				var results = turtle.results;
				if (idx >= 0 && idx < results.length) {
					turtle.clear();
					turtle.run(results[idx], {
						tropism: this.trees[i].tree.tropism,
						growth: this.trees[i].tree.growth
					});
				}
				if (idx >= results.length) {
					turtle.clear();
					removeList.push(turtle.idx);
				}
			}
			for (var j = 0; j < removeList.length; j++) {
				this.removeTree(removeList[j]);
			}
			this.age ++;
		}
	}
})();