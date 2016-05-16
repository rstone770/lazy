var expect = require('chai').expect,
    lazy   = require('../lazy'),
    Lazy   = lazy;

var noop = function () {};

describe('Lazy Api', function () {
  describe('#isLazy', function () {
    it('should be a function.', function () {
      expect(lazy).to.have.property('isLazy').and.is.a('function');
    });

    it('should return false for non Lazy values.', function () {
      var values = [
        null,
        undefined,
        0,
        "some value",
        {},
        []
      ];

      values.forEach(function (value) {
        expect(lazy.isLazy(value)).to.equal(false);
      });
    });

    it('should return true for Lazy values.', function () {
      expect(lazy.isLazy(lazy(noop))).to.equal(true);
    });
  });

  it('should expose a version string.', function () {
    expect(lazy).to.have.property('version').and.is.a('string');
  });

  it('should be a function.', function () {
    expect(lazy).to.be.a('function');
  });

  it('should create a lazy object when called.', function () {
    var result = lazy(noop);

    expect(result).to.not.equal(undefined);
    expect(lazy.isLazy(result)).to.equal(true);
  });

  it('should create a lazy object with new.', function () {
    var result = new Lazy(noop);

    expect(result).to.not.equal(undefined);
    expect(lazy.isLazy(result)).to.equal(true);
  });

  it('should throw a TypeError on non function argument.', function () {
    var throwables = [
      null,
      undefined,
      123,
      "foo bar",
      [],
      {}
    ];

    throwables.forEach(function (throwable) {
      expect(function () {
        lazy(throwable)
      }).to.throw(TypeError);
    })
  });
});