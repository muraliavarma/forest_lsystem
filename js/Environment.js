(function() {
	Environment = function() {
		this._sun = {
			elevation: 100,
			axis: new THREE.Vector3(1, 0, 0)
		}
	};

	Environment.prototype = {
		_sun: {},
		_trees: [],
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
			this._trees.push(tree);
			tree.generate(turtle);
		}
	}
})();