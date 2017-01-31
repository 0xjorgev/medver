if (typeof define !== 'function')
    var define = require('amdefine')(module)

define(['util', 'lme'], function (util, lme) {
    var inspect = util.inspect
    var _log = obj => console.log(inspect(obj, {colors: true, depth: Infinity }))

    var logger = {}
    var LOG_LEVEL_DEBUG = 0
    var LOG_LEVEL_INFO = 100
    var LOG_LEVEL_ERROR = 500
    var LOG_LEVEL_NONE = 999

    var getCurrentLogLevel = () => {
    	var lvl = null
    	switch(process.env.LOG_LEVEL){
    		case 'DEBUG':
    			lvl = LOG_LEVEL_DEBUG
    			break
    		case 'INFO':
    			lvl = LOG_LEVEL_INFO
    			break
    		case 'ERROR':
    			lvl = LOG_LEVEL_ERROR
    			break
    		case 'NONE':
    			lvl = LOG_LEVEL_NONE
    			break
    		default:
    			lvl = LOG_LEVEL_DEBUG
    	}
    	return lvl
    }

    logger.debug = obj => {
    	if(LOG_LEVEL_DEBUG >= getCurrentLogLevel()) lme.d(_log(obj))
    }

    logger.info  = obj => {
    	if(LOG_LEVEL_INFO >= getCurrentLogLevel()) lme.s(_log(obj))
    }

    logger.error = obj => {
    	if(LOG_LEVEL_ERROR >= getCurrentLogLevel()) lme.e(_log(obj))
    }

    return logger
})
