var chai = require('chai');
var expect = chai.expect;

var b = require('./boss');
describe('boss', function() {
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