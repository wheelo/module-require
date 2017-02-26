'use strict';

var Module = (function() {
	
	var modules = {};

	function define(name, fn) {
		if (modules[name])
			throw Error('A module named ' + name + ' is already defined');

		var module = {
			exports: {},
			fn: fn,
			executed: false
		};

		modules[name] = module;
	}

	function require(name) {
		var module = modules[name];
		if (! module)
			throw new Error('Module ' + name + ' not found');

		if (! module.executed) {
			module.executed = true;
			module.fn.call(module, module, module.exports);
		}

		return module.exports;
	}

	return {
		define: define,
		require: require
	};
})();


// module.exports = modules;
// module.exports.default = modules;
Module.define('cache', function (module, exports) {
	module.exports = function (max) {
		var keys = [];
		var cache = {};

		return {
			get: function(key) {
				return cache[key];
			},
			set: function(key, value) {
				keys.push(key);
				if (keys.length > max) {
					var oldestKey = keys.shift();
					delete cache[oldestKey];
				}
				cache[key] = value;
			}
		};
	}
});

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

// use the command to concat files: `cat ../module.js cache.js currency.js app.js > all.js`

var currency = Module.require('currency');


[12, 12.34, 12.345].forEach(function(val) {
  var rounded = currency.round(val);
  console.log('rounded ' + val + ' is ' + rounded);
});
