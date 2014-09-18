module.exports = (function() {
  var self = {};

  // Create and store unsettable and undeletable values
  self.constants = {
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