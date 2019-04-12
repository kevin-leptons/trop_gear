const assert = require('assert')

const {Stack} = require('../lib')

describe('Stack.constructor()', () => {
    it('with default arguments', () => {
        new Stack()
    })

    it('with empty array', () => {
        new Stack([])
    })

    it('with non-empty array', () => {
        new Stack([1, 2, 3])
    })

    it('with null', () => {
        assert.throws(() => {
            new Stack(null)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with true', () => {
        assert.throws(() => {
            new Stack(true)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with false', () => {
        assert.throws(() => {
            new Stack(false)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a number', () => {
        assert.throws(() => {
            new Stack(1)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a string', () => {
        assert.throws(() => {
            new Stack('this is string')
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with an object', () => {
        assert.throws(() => {
            new Stack({})
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a function', () => {
        assert.throws(() => {
            new Stack(function() {})
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })
})

describe('Stack.size', () => {
    it('with empty stack', () => {
        let s = new Stack([])

        assert.equal(s.size, 0)
    })

    it('with non-empty stack', () => {
        let s = new Stack([1, 2, 3])

        assert.equal(s.size, 3)
    })
})

describe('Stack.push()', () => {
    it('with undefined', () => {
        let s = new Stack()

        s.push(undefined)
    })

    it('with null', () => {
        let s = new Stack()

        s.push(null)
    })

    it('with true', () => {
        let s = new Stack()

        s.push(true)
    })

    it('with false', () => {
        let s = new Stack()

        s.push(false)
    })

    it('with a number', () => {
        let s = new Stack()

        s.push(1)
    })

    it('with a string', () => {
        let s = new Stack()

        s.push('string')
    })

    it('with an object', () => {
        let s = new Stack()

        s.push({})
    })

    it('with a function', () => {
        let s = new Stack()

        s.push(function() {})
    })
})

describe('Stack.top()', () => {
    it('with empty stack', () => {
        let s = new Stack()

        assert.throws(() => {
            s.top()
        }, {
            name: 'NotFound',
            message: 'Stack is empty'
        })
    })

    it('with non-empty stack', () => {
        let s = new Stack([1, 2, 3])
        let top = s.top()

        assert.equal(top, 3)
        assert.equal(s.size, 3)
    })
})

describe('Stack.pop()', () => {
    it('with empty stack', () => {
        let s = new Stack()

        assert.throws(() => {
            s.pop()
        }, {
            name: 'NotFound',
            message: 'Stack is empty'
        })
    })

    it('with non-empty stack', () => {
        let s = new Stack([1, 2, 3])
        let top = s.pop()

        assert.equal(top, 3)
        assert.equal(s.size, 2)
    })
})

describe('Stack.clear()', () => {
    it('with empty stack', () => {
        let s = new Stack()

        s.clear()
        assert.equal(s.size, 0)
    })

    it('with non-empty stack', () => {
        let s = new Stack([1, 2, 3])

        s.clear()
        assert.equal(s.size, 0)
    })
})
