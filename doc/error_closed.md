# error.Closed

## Members

### constructor(message=undefined, prev_error=undefined, context=undefined)

* Description
    * Describe an operation can not be perform because that function is
      not avaiable at that time.
    * That situation occurs on objects which provides life-time mechanism.
      And at call time, it's life-time is ended.
* Input
    * `message` / `any` / `undefined`
    * `prev_error` / `Error` / `undefined`
    * `context` / `Any` / `undefined`
