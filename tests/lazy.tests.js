var expect = require('chai').expect,
    lazy   = require('../lazy');

var noop = function () {};

describe('Lazy', function () {
  describe('value', function () {
    it('should call factory on access.', function () {
      var called  = false,
          factory = function () {
            called = true;
          };

      lazy(factory).value;
      expect(called).to.equal(true);
    });

    it('should only call the factory once.', function () {
      var called = 0,
          lz = lazy(function () {
            called++;
          });

      for(var i = 0; i < 10; i++) {
        lz.value;
      }

      expect(called).to.equal(1);
    });

    it('should return the result of the factory.', function () {
      var result = lazy(function () {
        return 'jam';
      }).value;

      expect(result).to.equal('jam');
    });

    it('should return the same value across calls.', function () {
      var lz = lazy(function () {
        return {};
      });

      expect(lz.value).to.equal(lz.value);
    });
  });

  describe('created', function () {
    it('should initially be false.', function () {
      expect(lazy(noop).created).to.equal(false);
    });
    
    it('should be true after value has been created.', function () {
      var lz = lazy(noop);

      lz.value;
      expect(lz.created).to.equal(true);
    });
  });

});