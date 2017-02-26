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
