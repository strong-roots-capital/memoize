/**
 * memoize
 * Higher-order memoization function
 */

import { LRUCache } from 'lru-fast'

/**
 * Memoize function `f`, storing at most `cacheSize` historical
 * results.
 */
export const memoize = (cacheSize: number) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <F extends (...args: any) => any>(f: F): F => {
    const lru = new LRUCache<Parameters<F>, ReturnType<F>>(cacheSize);
    return function (...args: Parameters<F>): ReturnType<F> {
        const cached = lru.get(args)
        if (cached !== undefined) {
            return cached
        } else {
            const value = f(...args)
            lru.set(args, value)
            return value
        }
    } as F
}
