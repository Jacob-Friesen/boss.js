/**
 * @description
 * An object that provides utility functions to JS. See https://github.com/Jacob-Friesen/boss.js
 * for more details.
 */
module.exports = (function() {
  'use strict';

  var self = {};

  /**
   * @description
   * An object containing a list of constant names to values. Once a constant is defined it cannot
   * be unset or deleted. Although it can be deleted if its parent is deleted.
   */
  self.constants = {

    /**
     * @description
     * Add a constant to the set of constants.
     *
     * @param {string} name The name of the accessor property for the constant.
     * @param {Object} val The value of the constant. Can be anything; string, number, function etc.
     *
     * @returns {Boss.constants} Object containing the set of constants.
     */
    add: function(name, val) {
      Object.defineProperty(self.constants, name, {
        value: val,

        // These should be default values, but you know how browsers are...
        writable: false,
        configurable: false
      });

      return self.constants;
    }
  };

  /**
   * @description
   * Deconstruct a function by passing each of its values (returned as an array) as arguments.
   * NOTE: Since only about 255 arguments can be passed into a function, this will fail when
   *       returning more than that. Unlikely, but possible.
   *
   * @param {Object[]} result The array of values returned from calling the callback.
   * @param {function(resultsArray)} callback Called with the list of results from callback.
   *
   * @returns {Boss} The library.
   */
  self.deconstruct = function(result, callback) {
    if (typeof(callback) !== 'function') {
      throw('Error: You must define a callback.');
    }

    // For ease of use, need to be able to handle a single return not in an array.
    callback.apply(this, Array.isArray(result) ? result : [result]);
    
    return self;
  };

  /**
   * @description
   * Defines default values for a given function. When an argument is not sent or it is undefined,
   * the value automatically becomes the default.
   *
   * @param {Object} (arguments 1 to n-1) The default values to assign to parameters.
   * @param {function} (argument n) The function to wrap.
   *
   * @returns {function()} The function wrapped with default values.
   */
  self.defaults = function(/*default1 , ... , defaultN, callback*/) {
    var outerArgs = Array.prototype.slice.call(arguments),
        callback = outerArgs.slice(-1)[0],
        defaults = outerArgs.slice(0, -1);

    return function () {
      var args = Array.prototype.slice.call(arguments);

      defaults.forEach(function(val, index) {
        args[index] = (typeof args[index] === 'undefined') ? defaults[index] : args[index]; 
      });

      return callback && callback.apply ? callback.apply(this, args) : null;
    };
  };

  /**
   * @description
   * Defines default values for a configuration object sent in to initialize an object. When this
   * object is initialized and properties are not specified like in the defaults, they are
   * overrided by values in the defaults.
   *
   * @param {Object} defaults The default values object.
   * @param {function} callback The function (usually an object constructor) to wrap.
   *
   * @returns {function()} The function wrapped with default values.
   */
  self.defaultObj = function(defaults, callback) {
    defaults = (defaults !== undefined) ? defaults : {};

    return function(currentObj) {
      currentObj = (currentObj !== undefined) ? currentObj : {};

      var newDefaults = {};
      [defaults, currentObj].forEach(function(obj) {
        for (var property in obj) {
          newDefaults[property] = obj[property];
        }
      });

      return callback && callback(newDefaults);
    }
  };

  /**
   * @description
   * Defines an end parameter for a passed in function that will store all non specified arguments
   * in an array. If all arguments are specified, the rest parameter will be an empty list.
   *
   * @param {function()} callback The function to wrap.
   *
   * @returns {function()} The function wrapped with a restize parameter added.
   */
  self.restize = function(callback) {
    return function() {
      var args = Array.prototype.slice.call(arguments);

      // Take all the specified arguments and send them directly.
      var number = (arguments.length - 1) - callback.length,
          toSend = args.slice(0, number).concat([args.slice(number)]);

      // Empty rest param when there is not enough arguments.
      if (toSend.length === 1) {
        toSend.push([]);
      }

      return callback.apply(null, toSend);
    };
  };

  return self;
})();