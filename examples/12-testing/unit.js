const assert = require('assert')

function addition(a, b) {
  return a + b;
}

assert(addition(2, 2) === 4);
assert(addition(0, 2) === 2);
assert(addition(-2, 2) === 0);