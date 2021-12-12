import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { memoize } from '../../src/memoize'

const constant =
  <T>(value: T) =>
  (): T =>
    value

testProp(
  'should always yield same value for pure functions',
  [fc.nat()],
  (t, num) => {
    const f = constant(num)
    const memoized = memoize(f)
    t.is(memoized(), num)
  },
  {
    verbose: true,
    numRuns: 100,
  },
)
