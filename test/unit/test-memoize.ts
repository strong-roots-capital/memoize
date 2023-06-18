import test from "node:test";
import { strict as assert } from "node:assert";

/**
 * Unit under test
 */

import { memoize } from "../../src/memoize";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

test("should memoize the identity function", () => {
  const id = <T>(value: T): T => value;
  const memoized = memoize(1, id);

  // warm up the cache
  assert.equal(memoized(1), 1);

  // test the cache
  assert.equal(memoized(1), 1);
});

test("should throw when the function to memoize is undefined", () => {
  assert.throws(() => memoize(1, undefined as any));
});

test("should memoize a closure", () => {
  let current = 0;
  const f = (): number => {
    current += 1;
    return current;
  };
  const memoized = memoize(f);

  // warm up the cache
  assert.equal(memoized(), 1);

  // test the cache
  assert.equal(memoized(), 1);
});

test("should memoize different values for equivalent but different object inputs", () => {
  const key1 = [{ cat: "horse" }, 2, 3];
  const key2 = JSON.parse(JSON.stringify(key1));

  let state = 0;
  const memoized = memoize(10, function (_key: unknown) {
    return ++state;
  });

  assert.ok(key1 != key2);
  assert.ok(key1 !== key2);
  assert.equal(memoized(key1), 1);
  assert.equal(memoized(key2), 2);
});

test("should yield the same value for the same inputs", () => {
  const key = [{ cat: "horse" }, 2, 3];

  let state = 0;
  const memoized = memoize(10, function (_key: unknown) {
    return ++state;
  });

  assert.equal(memoized(key), 1);
  assert.equal(memoized(key), 1);
});
