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
});