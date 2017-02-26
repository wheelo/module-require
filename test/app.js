// use the command to concat files: `cat ../module.js cache.js currency.js app.js > all.js`

var currency = Module.require('currency');


[12, 12.34, 12.345].forEach(function(val) {
  var rounded = currency.round(val);
  console.log('rounded ' + val + ' is ' + rounded);
});
