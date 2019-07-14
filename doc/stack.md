# Stack

Last in Last Out data structure.

```js
const {Stack} = require('@trop/gear')
```

## Members

### constructor(items=[])

* Description
    * Data structure for last in last out items
* Input
    * `items` /` Array<any>` / `[]` - Preset items, items[LAST] is top of
      stack.  Items is copy to internal of stack.
* Exception
    * `TypeError` - Items must be an array

## get size()

`Number` - Non-negative integer, number items in stack

## push(item)

* Description
    * Put an item into top of stack
* Input
    * `item` / `any`
* Output - none
* Exception - none

### top()

* Description
    * Retrieve top item in stack
* Input - none
* Output
    * `any` - Item is on top of stack
* Exception
    * `NotFound` - Stack is empty

### pop()

* Description
    * Retrieve top item of stack
    * Remove that item from stack
* Input - none
* Output
    * `any` - Item is on top of stack
* Exception
    * `NotFound` - Stack is empty

### clear()

* Description
    * Remove all items from stack
* Input - none
* Output - none
* Exception - none

## Example

```js
const {Stack} = require('@trop/gear')

// stack: 1-2-3 [front]
let s = new Stack([1, 2, 3])

// stack: 1-2-3-4 [front]
q.push(4)

// stack: 1-2-3-4 [front]
// return 4
q.front()

// stack: 1-2-3 [front]
// return 4
q.pop()

// stack: 1-2-3 [front]
// return 3
q.size

// stack: [front]
q.clear()
```
