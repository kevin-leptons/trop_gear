# Queue

First in First Out data structure.

```js
const {Queue} = require('@trop/gear')
```

## Members

### constructor(items=[])

* Description
    * Data structure for first in first out items, fixed capacity
* Input
    * `items` / `Array<any>` / `[]` - Preset items, items[0] is front and
      items[LAST] is back of queue
* Exception
    * `TypeError` - Items must be an array

### get size()

`Number` - Non-negative integer, number of items in queue

### push(item)

* Description
    * Push an item to back of queue
* Input
    * `item` / `any`
* Output - none

### pop()

* Description
    * Retrieve item in front of queue
    * Remove that item from queue
* Output
    * `any`
* Exception
    * `NotFound` - Queue is empty

### front()

* Description
    * Retrieve item in front of queue
* Output
    * `any`
* Exception
    * `NotFound` - queue has no items

### clear()

* Description
    * Remove all of items in queue
* Input - none
* Output - none

## Example

```js
const {Queue} = require('@trop/gear')

// queue: [front] 1-2-3 [back]
let q = new Queue([1, 2, 3])

// queue: [front] 1-2-3-4 [back]
q.push(4)

// queue: [front] 1-2-3-4 [back]
// return 1
q.front()

// queue: [front] 2-3-4 [back]
// return 1
q.pop()

// queue: [front] 2-3-4 [back]
// return 3
q.size

// queue: [front] [back]
q.clear()
```
