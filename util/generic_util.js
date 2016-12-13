if (typeof define !== 'function')
    var define = require('amdefine')(module)

define([], () => {

	var utilities = {}

	//verifica si el objeto es un array.
	//retorna boolean
	utilities.isArray = myObject => (!(Object.prototype.toString.call( myObject ) === '[object Array]'))

	return utilities
})
