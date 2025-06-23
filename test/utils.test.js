const assert = require('assert');
const { sum } = require('../src/main/utils');

describe('utils', function () {
  it('adds numbers', function () {
    assert.strictEqual(sum(1, 2), 3);
  });
});
