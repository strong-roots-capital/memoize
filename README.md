# memoize

[![License][]](https://opensource.org/licenses/ISC)
[![NPM Package][]](https://npmjs.org/package/@strong-roots-capital/memoize)
[![Build Status]](https://github.com/strong-roots-capital/memoize/actions/workflows/ci.yml)
[![semantic-release]](https://github.com/semantic-release/semantic-release)

[license]: https://img.shields.io/badge/License-ISC-blue.svg
[npm package]: https://img.shields.io/npm/v/@strong-roots-capital/memoize.svg
[build status]: https://github.com/strong-roots-capital/memoize/actions/workflows/ci.yml/badge.svg
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

> Higher-order memoization function

Why?

I couldn't find a simple memoization library that was all of the following

- stable
- statically typed
- control over memory usage
- used the fastest LRU
- offered the simplest syntax

## Install

```shell
npm install @strong-roots-capital/memoize
```

## Use

```typescript
import { memoize } from '@strong-roots-capital/memoize'

declare function f(parameter: number)

const cacheSize = 100
const memoized = memoize(cacheSize)(f)

// Then use `memoized` in place of `f`
memoized(42)
```

Note that the underlying LRU is implemented with an es6 [map], so cache hits are
governed by the rules of [Map.prototype.get]; for example, objects are compared with
strict equality.

As a result, `memoize` only accepts [thunks] (functions accepting zero arguments) and
[unary functions] (functions accepting a single argument).

[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[map.prototype.get]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
[thunks]: https://en.wikipedia.org/wiki/Thunk
[unary functions]: https://en.wikipedia.org/wiki/Unary_function

## Related

- [mem](https://github.com/sindresorhus/mem)
- [typescript-memoize](https://github.com/darrylhodgins/typescript-memoize)
- [memoizer](https://github.com/ckoliber/memoizor)
- [memoize-one-ts](https://github.com/flycrum/memoize-one-ts)

## Acknowledgments

- [lru_map](https://github.com/rsms/js-lru)
