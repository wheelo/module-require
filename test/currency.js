Module.define('currency', function (module, exports) {
	var cache = Module.require('cache')(100);
	module.exports = {
		round: function (amount) {
			var rounded = cache.get(amount);
			if (! rounded) {
				rounded = Math.round(amount * 100) / 100;
				cache.set(amount, rounded);
			}
			return rounded;
		}
	};
});

