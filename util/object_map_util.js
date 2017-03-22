if (typeof define !== 'function')
    var define = require('amdefine')(module)

define([], () => {
  //===============================================================
  // Replaces values of the object's key in the string_template
  //===============================================================

  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };

  var keyValueReplace = (obj, string_template) => {
    if (obj != undefined && obj != null) {

        const object_map = (_obj) => {
          return (key) => {
              string_template =  string_template.replaceAll(key, _obj[key])
          }
        }
        Object.keys(obj).map( object_map(obj) )
        return string_template
    } else {
      return string_template
    }
  }

  return keyValueReplace

})
