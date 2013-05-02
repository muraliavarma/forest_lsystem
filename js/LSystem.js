(function() {
	LSystem = function(opts) {
		this._opts = opts;
		this.maxAge = opts.maxAge;
		this.axiom = opts.axiom;
		this.rules = {};
		this.growth = opts.growth;
		for (var i = 0; i < opts.rules.length; i++) {
			var rule = opts.rules[i];
			this.rules[rule.lhs] = rule.rhs;
			for (var constant in opts.constants) {
				this.rules[rule.lhs] = this.rules[rule.lhs].replace(new RegExp(constant, 'g'), opts.constants[constant]);
			}
		}
		this.tropism = opts.tropism;
	};

	LSystem.prototype = {
		maxAge: 1,
		age: 0,
		axiom: null,
		rules: null,
		growth: 1,
		tropism: null,
		generate: function(turtle) {
			var numRules = this.rules.length;
			var axiom = null;
			var res = this.axiom;
			var idx = 0;
			var tropism = this.tropism;
			var growth = this.growth;

			for (var i = 0; i < this.maxAge; i++) {
				axiom = res;
				res = '';
				for (var j = 0; j < axiom.length;) {
					var left = axiom[j];
					var paramString = '';
					if (++j < axiom.length && axiom[j] == '(') {
						//above if condition also increments j, so we don't need to do it in the above for loop
						while (++j < axiom.length && axiom[j] != ')') {
							paramString += axiom[j];
						}
						j++;	//to move on from the closing paranthesis
					}
					res += this._parametrize(left, paramString);
				}
				turtle.results.push(res);
			}
		},
		// clone: function() {
		// 	var opts = this._opts;
		// 	return new LSystem({
		// 		maxAge: opts.maxAge,
		// 		axiom: opts.axiom,
		// 		rules: opts.rules,
		// 		growth: opts.growth,
		// 		env: opts.env,
		// 		constants: opts.constants,
		// 		tropism: opts.tropism
		// 	});
		// },
		_parametrize: function(literal, paramString) {
			if (!paramString) {
				return this.rules[literal] || literal;
			}
			var params = paramString.split(', ');
			for (var rule in this.rules) {
				if (rule.indexOf(literal) == 0) {
					//we have got the rule that we need
					//now we match parameters in this rule with corresponding value in the axiom (params)
					var ruleParams = rule.substring(literal.length + 1, rule.length - 1).split(', ');
					var ruleMatches = {};
					for (var i = 0; i < params.length; i++) {
						ruleMatches[ruleParams[i]] = params[i];
					}
					var right = this.rules[rule];
					for (var ruleMatch in ruleMatches) {
						right = right.replace(new RegExp(ruleMatch, 'g'), ruleMatches[ruleMatch]);	//i sense major performance issue in this regexp creation
					}
					//now evaluate the expressions inside the brackets
					var ret = ''
					for (var i = 0; i < right.length; i++) {
						if (right[i] == '(') {
							ret += '(';
							var oldIdx = i + 1;
							while (right[++i] != ')') {
								//keep incrementing i until the end of the bracket
							}
							var params2 = right.substring(oldIdx, i).split(', ');
							for (var j in params2) {
								ret += eval(params2[j].replace(/\-/g, '-1*')) + ', ';
							}
							ret = ret.substring(0, ret.length - 2) + ')';
						}
						else {
							ret += right[i];
						}
					}
					return ret;
				}
			}
			return literal + '(' + paramString + ')';
		}
	};

})();