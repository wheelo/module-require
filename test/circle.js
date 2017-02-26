import Module from '../index.js';


// a.js
Module.define('a', function(module, exports) {
  exports.array = ['a'];
  Module.require('b');
});

//b.js
Module.define('b', function(module) {
  var c = Module.require('c');
  c.push('b');
  module.exports = c;
});


//c.js
Module.define('c', function(module) {
  var a = Module.require('a');
  a.array.push('c');
  module.exports = a.array;
});