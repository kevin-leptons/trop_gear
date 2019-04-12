const error = require('./error')

class Stack {
	// Description
	// * Data structure for last in last out items
	//
    // Input
    // * items / Array<any> / [] - Preset items, items[LAST] is top of stack
    //
	// Exception
	// * TypeError - Items must be an array
    constructor(items=[]) {
        this._verify_constructor_input(items)
        this._array = items
    }

    // Number
    // Non-negative integer, number items in stack
    get size() {
        return this._array.length
    }

    // Description
    // * Put an item into top of stack
    //
    // Input
    // * item / any
    //
    // Output - none
	//
	// Exception - none
    push(item) {
		this._array.push(item)
    }

    // Description
    // * Retrieve top item in stack
    //
    // Input - none
    //
    // Output
    // * any - Item is on top of stack
    //
    // Exception
    // * NotFound - Stack is empty
    top() {
		if (this._array.length === 0) {
			throw new error.NotFound('Stack is empty')
		}
		return this._array[this._array.length - 1]
    }

    // Description
    // * Retrieve top item of stack
    // * Remove that item from stack
    //
    // Input - none
    //
    // Output
    // * any - Item is on top of stack
    //
    // Exception
    // * NotFound - Stack is empty
    pop() {
		if (this._array.length === 0) {
			throw new error.NotFound('Stack is empty')
		}
		return this._array.pop()
    }

	// Description
	// * Remove all items from stack
	//
	// Input - none
	//
	// Output - none
	//
	// Exception - none
    clear() {
		this._array = []
    }

    // PRIVATE MEMBERS

    _verify_constructor_input(items) {
        if (!Array.isArray(items)) {
            throw TypeError('Items must be an array')
        }
    }
}

module.exports = Stack
