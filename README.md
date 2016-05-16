Lazy
====

An tiny, isomorphic, lazy value initialization library. This library wraps a value factory with a lazy
object that will deffer factory execution until the value is actually used. Afterwards, the value is cached
and is immediately available.

## Installation
```bash
npm install @mosfetish/lazy --save
```


## Example
```javascript
var lazy = require('@mosfetish/lazy');

var lazied = lazy(function () {
  var fib = function(n) {
    return n <= 2
      ? 1
      : fib(n - 1) + fib(n - 2);
  };

  return fib(10);
});

// now use.
var fib10 = lazied.value;
```

## Api

### (factory)
Return: ```Lazy: ({created: boolean, value: any})```

Calling the api directly will wrap a factory function and return a lazy instance. The lazy  instance
has two properties; ```value``` and ```created```.

#### Lazy.created
This value is initially false and will become true after the factory has been invoked.

```javascript
var lazied = lazy(function() { /*...*/ });

lazied.created; // false
lazied.value;
lazied.created; // true
```

#### Lazy.value
This is the actual value that the factory returns. Initially it is null, but when accessed will be
assigned to the result of the factory. This value is cached so future calls get this value immediately.

```javascipt
var lazied = lazy(function() { return {} });
lazied.value // {}
lazied.value == lazied.value; // true
```

### isLazy(value)
Return: ```Boolean```
Determines if the value is a lazy object.

```javascript
lazy.isLazy({}); // false
lazy.isLazy(); // false
lazy.isLazy('string'); // false
lazy.isLazy(lazy(function() {})); // true
```

### version
The current library version.

##License
Lazy is licensed under [MIT](LICENSE).