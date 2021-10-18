import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { memoize } from '../../src/memoize'

const constant = <T>(value: T) => (): T => value

testProp(
  'should always yield same value for pure functions',
  [fc.nat()],
  (t, num) => {
    const f = constant(num)
    const memoized = memoize(1)(f)
    t.is(num, memoized())
  },
  {
    verbose: true,
    numRuns: 100,
  },
)

// TEST: test a function with a timeout to ensure the cache is being utilized
