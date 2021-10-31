import test from 'ava'

/**
 * Unit under test
 */

import { memoize } from '../../src/memoize'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

test('should memoize the identity function', (t) => {
  const id = <T>(value: T): T => value
  const memoized = memoize(1, id)

  // warm up the cache
  t.is(memoized(1), 1)

  // test the cache
  t.is(memoized(1), 1)
})

test('should memoize a closure', (t) => {
  let current = 0
  const f = (): number => {
    current += 1
    return current
  }
  const memoized = memoize(f)

  // warm up the cache
  t.is(memoized(), 1)

  // test the cache
  t.is(memoized(), 1)
})

test('should memoize different values for equivalent but different object inputs', (t) => {
  const key1 = [{ cat: 'horse' }, 2, 3]
  const key2 = JSON.parse(JSON.stringify(key1))

  let state = 0
  const memoized = memoize(10, function (_key: unknown) {
    return ++state
  })

  t.true(key1 != key2)
  t.true(key1 !== key2)
  t.is(memoized(key1), 1)
  t.is(memoized(key2), 2)
})

test('should yield the same value for the same inputs', (t) => {
  const key = [{ cat: 'horse' }, 2, 3]

  let state = 0
  const memoized = memoize(10, function (_key: unknown) {
    return ++state
  })

  t.is(memoized(key), 1)
  t.is(memoized(key), 1)
})
