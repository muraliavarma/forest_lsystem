(function() {
	Environment = function() {

	};

	Environment.prototype = {
		_trees: [],
		interpret: function(str) {
			var res = '';
			for (var i = 0; i < str.length; i++) {
				if (false /*add condition*/) {
					res += '';
				}
				else {
					res += str[i];
				}
			}
			return res;
		},
		addTree: function(tree) {
			this._trees.push(tree);
		}
	}
})();