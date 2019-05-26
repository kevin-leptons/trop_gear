# AsyncQueue

Data structure with mechanisms: first in first out, fixed capacity,
deferable on push and pop operations

```js
const {AsyncQueue} = require('@trop/std')
```

## AsyncQueue(items=[], capacity=8)

* Description
    * Create a new instance of queue
* Input
    * `items` / `Array<any>` / `[]` - Preset items in queue, `items[0]` is
      front of queue, `items[end]` is back of queue
    * `capacity` / `Number` / `8` - Maximum number of items in queue
* Output
    * `AsyncQueue`
* Exception
    * `TypeError` - Items must be an Array<any>
    * `TypeError` - Capacity must be a possitive integer
    * `RangeError` - Number of items is greater than capacity

## get size()

* Description
    * Retrieve number of items in queue
* Input - none    
* Output
    * `Number` - Unsigned, integer, number of items in queue

## get capacity()

* Description
    * Retrieve number of slots in queue
* Input - none
* Output
    * `Number` - Unsigned, integer, number of slots in queue

## push(item)

* Description
    * Put an item into back of queue
    * If queue is full then wait for at least a free slot in queue
    * If there are caller which is waiting on queue then other incoming
      callers will be reject
* Input
    * `item` / `any` - Item to push to back of queue
* Output
    * `Promise<undefined>`
* Exception
    * `Closed` - Queue is closed
    * `Conflict` - There are other caller on pushing

## pop()

* Description
    * Retrieve an item from front of queue
    * Remove that front item from queue
    * If queue is empty then wait for an item is pushed to queue
    * If there are caller which is waiting on queue then other incoming
      callers will be reject
* Input - none
* Output
    * `Promise<any>` - Front item of queue
* Exception
    * `Closed` - Queue is closed
    * `Conflict` - There are other caller on pushing

## close()

* Description
    * Close this queue, don't allow operations on this queue
    * If there are waiting on pushing or poping then reject all of it
* Input - none
* Output
    * `Promise<undefined>`

## reset()

* Description
    * Close then re-open queue
* Input - none
* Output
    * `Promise<undefined>`

## Example

```js
let q = new AsyncQueue([1, 2, 3], 10)

async function push_queue() {
    for (let i = 4; i < 1000; ++i) {
        await q.push(i)
    }

    await q.push(null)
}
async function pop_queue() {
    for (;;) {
        let item = await q.pop()
        console.log('pop', item)
        if (item === null) {
            break
        }
    }
}

await Promise.all([push_queue(), pop_queue()])
```
