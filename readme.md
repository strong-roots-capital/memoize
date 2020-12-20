# memoize
[![License][]](https://opensource.org/licenses/ISC)
[![NPM Package][]](https://npmjs.org/package/@strong-roots-capital/memoize)
[![Build status][]](https://travis-ci.org/strong-roots-capital/memoize)
[![Code Coverage][]](https://codecov.io/gh/strong-roots-capital/memoize)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[NPM Package]: https://img.shields.io/npm/v/@strong-roots-capital/memoize.svg
[Build status]: https://travis-ci.org/strong-roots-capital/memoize.svg?branch=master
[Code Coverage]: https://codecov.io/gh/strong-roots-capital/memoize/branch/master/graph/badge.svg

> Higher-order memoization function

Why?

I couldn't find a simple memoization library that was all of the
following

- stable
- statically typed
- control over memory usage
- used the fastest LRU
- offered the simplest syntax

Potential TODOs that I haven't budgeted time for:

- [ ] parameterize the cache-ejection algorithm

## Install

``` shell
npm install @strong-roots-capital/memoize
```

## Use

``` typescript
import { memoize } from '@strong-roots-capital/memoize'

declare function f(parameter: number);

const cacheSize = 100
const memoized = memoize (cacheSize) (f)

// Then use `memoized` in place of `f`
memoized(42)
```

## Related

- [mem](https://github.com/sindresorhus/mem)
- [typescript-memoize](https://github.com/darrylhodgins/typescript-memoize)
- [memoizer](https://github.com/ckoliber/memoizor)
- [memoize-one-ts](https://github.com/flycrum/memoize-one-ts)

## Acknowledgments

- [lru-fast](https://github.com/rsms/js-lru)
