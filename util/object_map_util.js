if (typeof define !== 'function')
    var define = require('amdefine')(module)

define([], (obj, string_template) => {
  //===============================================================
  // Replaces values of the object's key in the string_template
  //===============================================================
  var tmp = {}

  if (obj != undefined && obj != null) {
      tmp = obj
      const object_map = (_obj) => {
        return (key) => {
            string_template.replace(key, _obj[key])
        }
      }

      Object.keys(obj).map( object_map )
      return string_template
  } else {
    return string_template
  }

})
