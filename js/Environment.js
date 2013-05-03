(function() {
	Environment = function() {
		this.maxTrees = 50;
		this._currIdx = 0;
		this.age = 0;
		this.width = 200;
		this.height = 200;
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(10 * this.width, 10 * this.height, 1, 1), new THREE.MeshBasicMaterial({color: 0x5c4033}));
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
		// 		if (str[i] == ']') {
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
			turtle.remainingLife = tree.adulthood;
			turtle.adulthood = tree.adulthood;
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

			//competition between trees
			var dominatedList = [];
			for (var i = 0; i < this.trees.length; i++) {
				var iTree = this.trees[i];
				for (var j = i + 1; j < this.trees.length; j++) {
					var jTree = this.trees[j];
					if (Math.abs(iTree.pos.x - jTree.pos.x) < 50 && Math.abs(iTree.pos.y - jTree.pos.y) < 50) {
						if (iTree.turtle.age > jTree.turtle.age && iTree.turtle.remainingLife == iTree.turtle.adulthood) {
							if (dominatedList.indexOf(jTree.turtle.idx) < 0) {
								dominatedList.push(jTree.turtle.idx);
							}
						}
						else if (jTree.turtle.age > iTree.turtle.age && jTree.turtle.remainingLife == jTree.turtle.adulthood){
							if (dominatedList.indexOf(iTree.turtle.idx) < 0) {
								dominatedList.push(iTree.turtle.idx);
							}
						}
					}
				}
			}
			var removeList = [];
			var probability = 0;//Math.min(dominatedList.length / this.trees.length, 0.3);
			for (i = 0; i < this.trees.length; i++) {
				var turtle = this.trees[i].turtle;
				if (dominatedList.indexOf(turtle.idx) >= 0 && turtle.age > 4) {
					if (Math.random() > probability) {
						continue;
					}
				}
				var age = turtle.age;
				var results = turtle.results;
				if (age >= 0 && age < results.length) {
					turtle.clear();
					turtle.run(results[age], {
						tropism: this.trees[i].tree.tropism,
						growth: this.trees[i].tree.growth
					});
				}
				if (age >= results.length) {
					//I think this might fail during parallelization of some processes
					if (turtle.remainingLife-- <= 0) {
						turtle.clear();
						removeList.push(turtle.idx);
					}
					else {
						turtle.ageLeaves();
					}
				}
			}
			for (i = 0; i < removeList.length; i++) {
				this.removeTree(removeList[i]);
			}
			this.age ++;
			this._isUpdating = false;
		}
	}
})();