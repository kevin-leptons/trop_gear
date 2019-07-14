const error = require('./error')
const Deferral = require('./deferral')

class AsyncQueue {
    // Description
    // * A queue can be push or pop items by async action
    // * If queue is full then push() must wait until there are
    //   free slots in queue
    // * If queue is empty then pop() must wait until at least an item
    //   is pushed to queue
    // * If there is a caller waits on push() or pop() and other callers
    //   comming then late callers is rejects immediately
    // * On queue closing, all of waiting on queue is rejects
    //
    // Input
    // * items / Array<any> / [] - Preset items. items[0] is front of queue
    //   and items[n] is back of queue. It is copy to internal of queue intead
    //   of using directly.
    // * capacity / Number / 8 - Integer number represents for maximum number
    //   of items in queue
    //
    // Exception
    // * TypeError - Items must be an Array<any>
    // * TypeError - Capacity must be an possitive integer
    // * RangeError - Number of items is greater than capacity
    constructor(items=[], capacity=8) {
        this._verify_constructor_input(items, capacity)

        // Number
        // * Integer number represents for maximum number of items
        this._capacity = capacity

        // Array<any>
        // * Contains queue's items
        // * _item[0] is front of queue
        // * _item[last] is back of queue
        this._items = [...items]

        // Deferral
        // * defferal for a push request but there are no slot in queue
        // * null in caseof no such push request like that
        this._push_defer = null

        // Deferral
        // * defferal for a pop request but there are no item in queue
        // * null in caseof no such pop request like that
        this._pop_defer = null

        // Boolean
        // * true in caseof queue is closed
        // * false in caseof queue is not closed
        this._closed = false
    }

    // Number
    // Integer number represents for number of items in queue
    get size() {
        return this._items.length
    }

    // Number
    // Integer number represents for maximum number of items in queue
    get capacity() {
        return this._capacity
    }

    // Description
    // * Put an item into back of queue
    // * If queue is full then wait for at least a free slot in queue
    // * If there are caller which is waiting on queue then other incoming
    //   callers will be reject
    //
    // Input
    // * item / any - Item to push to back of queue
    //
    // Output
    // * Promise<undefined>
    //
    // Exception
    // * Closed - Queue is closed
    // * Conflict - There is an other caller waits on push()
    async push(item) {
        this._must_not_closed()
        await this._wait_for_slot()

        this._items.push(item)
        if (this._pop_defer) {
            this._pop_defer.resolve()
        }
    }

    // Description
    // * Retrieve an item from front of queue
    // * Remove that front item from queue
    // * If queue is empty then wait for an item is pushed to queue
    // * If there are caller which is waiting on queue then other incoming
    //   callers will be reject
    //
    // Input - none
    //
    // Output
    // * Promise<any> - Front item of queue
    //
    // Exception
    // * Closed - Queue is closed
    // * Conflict - There is an other caller waits on pop()
    async pop() {
        this._must_not_closed()
        await this._wait_for_item()

        let front = this._items.shift()
        if (this._push_defer) {
            this._push_defer.resolve()
        }
        return front
    }

    // Description
    // * Close this queue, don't allow operations on this queue
    // * If there are waiting on pushing or poping then reject all of it
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    async close() {
        this._closed = true
        this._item = []

        let e = new error.Closed('Queue is closed')
        if (this._push_defer) {
            this._push_defer.reject(e)
        }
        if (this._pop_defer) {
            this._pop_defer.reject(e)
        }
    }

    // Description
    // * Close then re-open queue
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    async reset() {
        await this.close()
        this._closed = false
    }

    // PRIVATE MEMBERS

    // Description
    // * Verify input of constructor
    //
    // Input - It is similar like constructor
    //
    // Output - none
    //
    // Exception
    // * TypeError - Items must be an Array<any>
    // * TypeError - Capacity must be a possitive integer
    // * RangeError - Number of items is greater than capacity
    _verify_constructor_input(items, capacity) {
        if (!Array.isArray(items)) {
            throw TypeError('Items must be an Array<any>')
        }
        if (!Number.isInteger(capacity) || capacity < 1) {
            throw TypeError('Capacity must be a possitive integer')
        }
        if (items.length > capacity) {
            throw RangeError('Number of items is greater than capacity')
        }
    }

    // Description
    // * wait for free slot in queue
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    //
    // Exception
    // * Conflict - There are other caller on pushing
    async _wait_for_slot() {
        if (this._items.length < this._capacity) {
            return
        }
        if (this._push_defer) {
            throw new error.Conflict('There are other caller on pushing')
        }

        this._push_defer = new Deferral()
        await this._push_defer.promise
        this._push_defer = null
    }

    // Description
    // * wait for at least item in queue
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    //
    // Exception
    // * Conflict - There are other caller on pushing
    async _wait_for_item() {
        if (this._items.length > 0) {
            return
        }
        if (this._pop_defer) {
            throw new error.Conflict('There are other caller on poping')
        }

        this._pop_defer = new Deferral()
        await this._pop_defer.promise
        this._pop_defer = null
    }

    // Description
    // * If queue is closed then throw error
    //
    // Input - None
    //
    // Output - None
    //
    // Exception
    // * Closed - Can not perform operations on closed queue
    _must_not_closed() {
        if (this._closed) {
            throw new error.Closed('Can not perform operations on closed queue')
        }
    }
}

module.exports = AsyncQueue
