# Changelog

## v0.4.0

* Add `error.ErrorChain`
* Change: `error.NotImplemented`, `error.NotFound`, `error.Conflict`,
  `error.InfiniteLoop`, `error.Closed` , `error.Capacity` extends from
  `error.ErrorChain` instead of `Error`

## v0.3.0

* Change Queue.constructor(items), items is copy to internal queue instead of
  using directly.
* Change Stack.constructor(items), items is copy to internal stack instead of
  using directly.

## v0.2.0

* Rename error.Useless to error.Closed
* Add AsynQueue

## v0.1.0

* Add error types: NotImplemented, NotFound, Conflict, InfiniteLoop, Useless,
  Capacity
* Add data structures: Queue, Stack
* Add other components: Deferral, Stopwatch
