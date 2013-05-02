(function() {
	Environment = function() {
		this._maxTrees = 25;
		this._currIdx = 0;
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshBasicMaterial({color: 0x222222}));
		plane.rotation.x = -Math.PI / 2;
		scene.add(plane);
	};

	Environment.prototype = {
		_trees: [],
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
			tree.idx = this._currIdx ++;
			this._trees.push({
				tree: tree,
				turtle: turtle
			});
			tree.generate(turtle);
		},
		removeTree: function(idx) {
			console.log(idx);
		}
	}
})();