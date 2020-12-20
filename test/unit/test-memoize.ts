import test from 'ava'

/**
 * Unit under test
 */

import { memoize } from '../../src/memoize'

test('should memoize the identity function', t => {
    const id = <T>(value: T): T => value
    const memoized = memoize (1) (id)

    // warm up the cache
    t.is(memoized(1), 1)

    // test the cache
    t.is(memoized(1), 1)
})

test('should memoize a closure', t => {
    let current = 0
    const f = (): number => {
        current += 1
        return current
    }
    const memoized = memoize (1) (f)

    // warm up the cache
    t.is(memoized(), 1)

    // test the cache
    t.is(memoized(), 1)
})
