(function() {
	Environment = function() {

	};

	Environment.prototype = {
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
		}
	}
})();