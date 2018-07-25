# element-rect-observer

[![Build Status](https://travis-ci.org/batata-frita/element-rect-observer.svg)](https://travis-ci.org/batata-frita/element-rect-observer)
[![npm version](https://img.shields.io/npm/v/element-rect-observer.svg?maxAge=1000)](https://www.npmjs.com/package/element-rect-observer)

## Known issues

- The spec for ResizeObserver has a known limitation that will cause the ResizeObserver to throw a `ResizeObserver loop limit exceeded` exception. This is not a problem, since nothing is actually broken, it’s just a consequence of the spec. You can find more details in a [discussion thread from the spec repo](https://github.com/WICG/ResizeObserver/issues/38#issuecomment-334816361)
