(function() {
	LSystem = function(opts) {
		this.iterations = opts.iterations;
		this.axiom = opts.axiom;
		this.rules = {};
		for (var i = 0; i < opts.rules.length; i++) {
			var rule = opts.rules[i];
			this.rules[rule.lhs] = rule.rhs;
		}
	};

	LSystem.prototype = {
		iterations: 1,
		axiom: null,
		rules: null,
		generate: function() {
			var numRules = this.rules.length;
			var axiom = null;
			var res = '';

			for (var i = 0; i < this.iterations; i++) {
				if (i == 0) {
					axiom = this.axiom;
				}
				else {
					axiom = res;
				}
				res = '';
				for (var j = 0; j < axiom.length; j++) {
					var left = axiom[j];
					res += this.rules[left];
				}
			}
			return res;
		}
	};

})();