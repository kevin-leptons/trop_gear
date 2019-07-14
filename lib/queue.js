const error = require('./error')

class Queue {
    // Description
    // * Data structure for first in first out items, fixed capacity
    //
    // Input
    // * items / Array<any> / [] - Preset items, items[0] is front and
    //   items[LAST] is back of queue. Items is clone so it does not affects
    //   to queue after initialization.
    //
    // Exception
    // * TypeError - Items must be an array
    constructor(items=[]) {
        this._verify_constructor_input(items)
        this._array = [...items]
    }

    // Number
    // Non-negative integer, number of items in queue
    get size() {
        return this._array.length
    }

    // Description
    // * Push an item to back of queue
    //
    // Input
    // * item / any
    //
    // Output - none
    push(item) {
        this._array.push(item)
    }

    // Description
    // * Retrieve item in front of queue
    // * Remove that item from queue
    //
    // Output
    // * any
    //
    // Exception
    // * NotFound - Queue is empty
    pop() {
        if (this._array.length === 0) {
            throw new error.NotFound('Queue is empty')
        }
        return this._array.shift()
    }

    // Description
    // * Retrieve item in front of queue
    //
    // Output
    // * any
    //
    // Exception
    // * NotFound - queue has no items
    front() {
        if (this._array.length === 0) {
            throw new error.NotFound('Queue is empty')
        }
        return this._array[0]
    }

    // Description
    // * Remove all of items in queue
    //
    // Input - none
    //
    // Output - none
    clear() {
        this._array = []
    }

    // PRIVATE METHODS

    _verify_constructor_input(items) {
        if (!Array.isArray(items)) {
            throw TypeError('Items must be an array')
        }
    }
}

module.exports = Queue
