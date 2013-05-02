(function() {
	Environment = function() {
		this.maxTrees = 25;
		this._currIdx = 0;
		this.age = 0;
		this.width = 100;
		this.height = 100;
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height, 1, 1), new THREE.MeshBasicMaterial({color: 0x222222}));
		plane.rotation.x = -Math.PI / 2;
		scene.add(plane);
		this._isUpdating = false;
	};

	Environment.prototype = {
		trees: [],
		age: 0,
		maxTrees: 0,
		_isUpdating: false,
		// interpret: function(str) {
		// 	var res = '';
		// 	for (var i = 0; i < str.length; i++) {
		// 		//mark the innermost branch as leaves
		// 		if (false /*str[i] == ']'*/) {
		// 			var branch = ']';
		// 			for (var j = i - 1; j >= 0; j--) {
		// 				if (str[j] == ']') {
		// 					//then this is not the innermost branch
		// 					res += ']';
		// 					break;
		// 				}
		// 				else if (str[j] == '[') {
		// 					res = str.substr(0, j + 1) + branch;
		// 					break;
		// 				}
		// 				else if (str[j] == 'A' || str[j] == 'B' || str[j] == 'C') {
		// 					branch = 'L' + branch + 'F(1)' + str[j];
		// 				}
		// 				else {
		// 					branch = str[j] + branch;
		// 				}
		// 			}
		// 		}
		// 		else {
		// 			res += str[i];
		// 		}
		// 	}
		// 	return res;
		// },
		addTree: function(tree, turtle) {
			turtle.idx = this._currIdx ++;
			turtle.birth = this.age;
			turtle.age = 0;
			//check a good place to place the tree
			var done = false;
			var posX;
			var posY;
			while(!done) {
				posX = this.width / 2 - parseInt(this.width * Math.random());
				posY = this.height / 2 - parseInt(this.height * Math.random());
				for (var i = 0; i < this.trees.length; i++) {
					if (posX == this.trees[i].pos.x && posY == this.trees[i].pos.y) {
						break;
					}
				}
				done = true;
			}
			turtle.setPos(new THREE.Vector3(posX, 0, posY));
			this.trees.push({
				tree: tree,
				turtle: turtle,
				pos: {
					x: posX,
					y: posY
				}
			});
			tree.generate(turtle);
		},
		removeTree: function(idx) {
			var index = 0;
			for (var i = 0; i < this.trees.length; i++) {
				if (this.trees[i].turtle.idx == idx) {
					index = i;
					break;
				}
			}
			this.trees.splice(index, 1);
		},
		update: function() {
			if (this._isUpdating) {
				return;
			}
			this._isUpdating = true;

			//spawn trees here?


			//competition between trees?

			var removeList = [];
			for (var i = 0; i < this.trees.length; i++) {
				var turtle = this.trees[i].turtle;
				var idx = turtle.age;
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
			this._isUpdating = false;
		}
	}
})();