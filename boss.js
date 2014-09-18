/**
 * @description
 * An object that provides utility functions to JS. See https://github.com/Jacob-Friesen/boss.js
 * for more details.
 */
module.exports = (function() {
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
     * @param {*} val The value of the constant. Can be anything; string, number, function etc.
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

  return self;
})();