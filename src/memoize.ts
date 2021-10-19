import { LRUMap } from 'lru_map'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Memoize function `f`.
 */
export function memoize<F extends () => any>(f: F): F

/**
 * Memoize function `f`, storing at most `cacheSize` historical
 * results.
 */
export function memoize<F extends (arg: any) => any>(cacheSize: number): (f: F) => F

export function memoize<F extends (arg: any) => any>(a: number | F): F | ((f: F) => F) {
  if (typeof a === 'number') {
    // cache size is defined
    const cacheSize = a
    const lru = new LRUMap<Parameters<F>[0], ReturnType<F>>(cacheSize)

    return function memoizer(f: F) {
      return function (arg: Parameters<F>[0]): ReturnType<F> {
        const cached = lru.get(arg)
        if (cached !== undefined) {
          return cached
        } else {
          const value = f(arg)
          lru.set(arg, value)
          return value
        }
      } as F
    }
  } else {
    // memoizing a thunk (assumed to be computationally expensive)
    let cached: ReturnType<F> | undefined = void 0

    return (function (): ReturnType<F> {
      if (cached !== undefined) {
        return cached
      } else {
        const value = a(void 0)
        cached = value
        return value
      }
    } as unknown) as F
  }
}
