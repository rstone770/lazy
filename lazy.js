/**!
 * Lazy v1.0.0
 * http://www.github.com/rstone770/lazy
 *
 * Licensed MIT
 **/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.lazy = factory();
  }
})(this, function () {

  var Lazy = function (factory) {
    if (typeof factory !== 'function') {
      throw new TypeError('factory must be a function.');
    }

    this._ = {
      factory: factory,
      value: null,
      created: false
    };
  };

  Lazy.prototype = {
    get created() {
      return this._.created;
    },

    get value () {
      if (!this._.created) {
        this._.value = this._.factory();
        this._.created = true;
      }

      return this._.value;
    }
  }

  var api = function (factory) {
    return new Lazy(factory);
  };

  api.isLazy = function (value) {
    return value instanceof Lazy;
  };

  api.version = "1.0.0";

  return api;
});