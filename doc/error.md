# Error

Additional error types

```js
const {error} = require('@trop/gear')
```

## Members

### NotImplemented(message)

* Description
    * A feature is not implements yet
* Input
    * `message` / `any` / `''` - Short description about error

### NotFound(message)

* Description
    * A resource is not existed
* Input
    * `message` / `any` / `''` - Short description about error

### Conflict(message)

* Description
    * A resource is already existed
    * An action can not perform because of affected resources are
      in relationship with others
* Input
    * `message` / `any` / `''` - Short description about error

### InfiniteLoop(message)

* Description
    * Pre condition causes infinite operations
* Input
    * `message` / `any` / `''` - Short description about error

### Useless(message)

* Description
    * Some object provide life-time mechanism to terminate waiting on it.
      After that object is change to CLOSED state, it does not allows
      perform actions anymore. So it's called useless object and just wait
      GC take it, unless it is re-open
* Input
    * `message` / `any` / `''` - Short description about error

### Capacity(message)

* Description
    * Some data structure has it's limitation about capacity. Push more
      data to that structure cause an error because it can not hold more
      than it's capacity
* Input
    * `message` / `any` / `''` - Short description about error

## Example

```js
const {error} = require('@trop/gear')

throw new NotImplemented('I am lazy')
```
