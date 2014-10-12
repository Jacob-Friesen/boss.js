var chai = require('chai');
var expect = chai.expect;

var b = require('./boss');
describe('boss', function() {
  describe('constants', function() {
    var testConstant = function(name, constant, newValue) {
      b.constants.add(name, constant);
      expect(b.constants[name]).to.deep.equal(constant);
      b.constants.STR = newValue;
      expect(b.constants[name]).to.deep.equal(constant);
      delete b.constants[name];
      expect(b.constants[name]).to.deep.equal(constant);
    };

    it('should start with no constants', function() {
      var add = b.constants.add;
      delete b.constants.add;

      expect(b.constants).to.deep.equal({});

      b.constants.add = add;
    });

    it('should be able to set a string constant', function() {
      testConstant('STR', 'set', 'set again');
    });

    it('should return constants from the add', function() {
      b.constants.add('STR', 'set').add('STR2', 'set again');
      expect(b.constants.STR).to.be.equal('set');
      expect(b.constants.STR2).to.be.equal('set again');
    });

    it('should be able to set a number constant', function() {
      testConstant('NUM', 42, 43);
    });

    it('should be able to set a null constant', function() {
      testConstant('NULL', null, undefined);
    });

    it('should be able to set an undefined constant', function() {
      testConstant('UNDEF', undefined, null);
    });

    it('should be able to set an object constant', function() {
      testConstant('OBJ', {property1: 'value1'}, {property2: 'value2'});
    });

    it('should be able to set a function constant', function() {
      testConstant('FUNC', function() { return true }, function() { return false });
      expect(b.constants.FUNC()).to.be.true;
    });
  });

  describe('deconstruct', function() {
    it('should throw an error when no result or callback was provided', function() {
      expect(b.deconstruct).to.throw();
      expect(function() {
        b.deconstruct([]);
      }).to.throw();
    });

    it('should give no arguments when there is no result', function() {
      b.deconstruct(undefined, function() {
        // Empty arguments is apparently not the same as {}, so to an array then.
        expect(Array.prototype.slice(arguments)).to.deep.equal([]);
      });
    });

    it('should give 1 argument when only one value was returned', function() {
      b.deconstruct('test', function(arg1) {
        expect(arg1).to.equal('test');
      });
    });

    it('should give 1 argument when a one value array was returned', function() {
      b.deconstruct(['test'], function(arg1) {
        expect(arg1).to.equal('test');
      });
    });

    it('should give 3 arguments when a 3 value array was returned', function() {
      var test = function() {
        return [1, 2, 3];
      };

      b.deconstruct(test(), function(a, b, c) {
        expect(a).to.equal(1);
        expect(b).to.equal(2);
        expect(c).to.equal(3);
      });
    });

    it('should support chaining', function() {
      expect(b.deconstruct([1, 2, 3], function(a, b, c) {})).to.equal(b);
    });
  });

  describe('defaults', function() {
    it('should return a function that returns nothing when passed nothing', function() {
      var callback = b.defaults();
      expect(callback()).to.be.null;
    });

    // Basically, just a bunch of invalid inputs
    describe('single argument', function() {
      it('should return a function that returns nothing when passed a non function', function() {
        [null, undefined, {}, 'test'].forEach(function(passing) {
          var callback = b.defaults(passing);
          expect(callback()).to.be.null;
        });
      });

      it('should not modify a function when only it is passed in', function() {
        var value1 = false;
        var callback = b.defaults(function() {
          value1 = true;
          return 1;
        });
        expect(callback()).to.equal(1);
        expect(value1).to.be.true;
      });

      it('should not modify a function when only it is passed in', function() {
        var value1 = false;
        var callback = b.defaults(function() {
          value1 = true;
          return 1;
        });
        expect(callback()).to.equal(1);
        expect(value1).to.be.true;
      });
    });

    describe('2 argument', function() {
      it('should return a function that returns nothing when last passed is not a function',
      function() {
        [null, undefined, {}, 'test'].forEach(function(passing) {
          var callback = b.defaults('test', passing);
          expect(callback()).to.be.null;
        });
      });

      it('should not set a functions default value when the param is specified', function() {
        var callback = b.defaults('test', function(param1) {
          return param1;
        });
        expect(callback('test2')).to.equal('test2');
      });

      it('should set a functions default value when it is specified', function() {
        var test = function(param1) {
          return param1;
        };

        var callback = b.defaults('test', test);
        expect(callback()).to.equal('test');
      });
    });

    describe('poly argument', function() {
      // The null return error case should be properly tested now.

      it('should not set a functions default values when their params are specified', function() {
        var callback = b.defaults('test1', 'test2', 'test3', function(param1, param2, param3) {
          return [param1, param2, param3];
        });
        expect(callback('testA', 'testB', 'testC')).to.deep.equal(['testA', 'testB', 'testC']);
      });

      it('should set the params whose values were not specified', function() {
        var test = function(param1, param2, param3) {
          return [param1, param2, param3];
        };

        var callback = b.defaults('test1', 'test2', 'test3', test);
        expect(callback('testA', 'testB')).to.deep.equal(['testA', 'testB', 'test3']);
        expect(callback('testA')).to.deep.equal(['testA', 'test2', 'test3']);
        expect(callback()).to.deep.equal(['test1', 'test2', 'test3']);

        // Don't forget that undefineds can be manually sent:
        expect(callback('testA', undefined, 'testC')).to.deep.equal(['testA', 'test2', 'testC']);
        expect(callback(undefined, undefined, 'testC')).to.deep.equal(['test1', 'test2', 'testC']);
      });

      it('should allow partial default value setting', function() {
        var test = function(param1, param2, param3) {
          return [param1, param2, param3];
        };

        var callback = b.defaults('test1', 'test2', test);
        expect(callback('testA', 'testB')).to.deep.equal(['testA', 'testB', undefined]);
        expect(callback('testA')).to.deep.equal(['testA', 'test2', undefined]);
        expect(callback()).to.deep.equal(['test1', 'test2', undefined]);

        var callback = b.defaults(undefined, 'test2', 'test3', test);
        expect(callback('testA', 'testB')).to.deep.equal(['testA', 'testB', 'test3']);
        expect(callback(undefined, 'testB')).to.deep.equal([undefined, 'testB', 'test3']);
        expect(callback()).to.deep.equal([undefined, 'test2', 'test3']);
      });
    });

    it('should preserve "this" from passed', function() {
      var callback = b.defaults(1, function(y) {
        return this.x + y;
      });
      expect(callback.call({
        x: 1
      })).to.be.equal(2);
    });
  });

  // I have a feeling that this needs to be tested more thoroughly.
  describe('restize', function() {
    it('should do nothing when no restize functions has been passed', function() {
      expect(b.restize).to.not.throw();
    });

    // Tests a parameter specified and then the rest parameter.
    describe('push restize', function() {
      // Good for testing purposes, but due to JSs function parameter limit this would be a bad
      // idea in production code.
      var push = b.restize(function(array, _items) {
        _items.forEach(function(item) {
          array.push(item);
        });
      });

      it('should handle no arguments', function() {
        expect(push).to.not.throw();
      });

      it('should be able to push onto an empty list', function() {
        var res = [];
        push(res, 1);
        expect(res).to.deep.equal([1]);
      });

      it('should push no items on when none are specified', function() {
        var res = [1, 2, 3];
        push(res);
        expect(res).to.deep.equal([1, 2, 3]);
      });

      it('should push no items with an initial empty list', function() {
        var res = [];
        push(res);
        expect(res).to.deep.equal([]);
      });

      it('should be able to push multiple items onto the list', function() {
        var res = [];
        push(res, 1, 2, 3);
        expect(res).to.deep.equal([1, 2, 3]);
      });
    });

    // This tests just the rest parameter being specified.
    describe('sumArray restize', function() {
      var sumArray = b.restize(function(_items) {
        var total = 0;
        _items[0].forEach(function(item) {
          total += item;
        });

        return total;
      });

      it('should return 0 for an empty array', function() {
        expect(sumArray([])).to.equal(0);
      });

      it('should the sum of the array', function() {
        expect(sumArray([1,2,3])).to.equal(6);
      });
    });
  });
});