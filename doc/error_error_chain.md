# error.ErrorChain

```js
const {ErrorChain} = require('@trop/gear').error
```

## Members

### constructor(message=undefined, prev_error=undefined, context=undefined)

* Description
    * Create chain of errors
* Input
    * `message` / `String` / `undefined` - Short, simple and clear description
      about error
    * `prev_error` / `Error` / `undefined` - Instance of error, that error occurs
      before this error
    * `context` / `Any` / `undefined` - Additional data describes how error
      occurs

### get chain()

* Description
    * Retrieve chain of errors in serializale data format
* Input - none
* Output - `Array<Object>`
    * `name` / `String`
    * `message` / `String`
    * `stack` / `Array<String>`
    * `context` / `Any` - Data describes how error occurs

### get origin_chain()

* Description
    * Retrieve chain of errors
* Input - none
* Output - `Array<Error | Any>`

## Example

```js
let {ErrorChain} = require('@trop/gear').error

let e0 = Error('Can not divide to zero')
let e1 = new ErrorChain('e0 causes e1', e0, {
    dividend: 3,
    divisor: 0
})
let e2 = new ErrorChain('e1 causes e2', e1)
let e3 = new ErrorChain('e2 causes e3', e2)

console.log(e3.chain)
```
