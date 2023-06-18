import test from "node:test";
import { strict as assert } from "node:assert";

import fc from "fast-check";

/**
 * Library under test
 */

import { memoize } from "../../src/memoize";

const constant =
  <T>(value: T) =>
  (): T =>
    value;

test("should always yield same value for pure functions", () => {
  fc.assert(
    fc.property(fc.nat(), (num) => {
      const f = constant(num);
      const memoized = memoize(f);
      assert.equal(memoized(), num);
    }),
    {
      verbose: true,
      numRuns: 100,
    }
  );
});
