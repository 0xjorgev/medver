if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', 'util'], (express, util) => {
	var Util = {}
	var inspect = util.inspect
	//log helper function
	Util.log = (obj) => console.log(inspect(obj, {colors: true, depth: Infinity }))
	return Util
})
