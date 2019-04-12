const assert = require('assert')

const {Queue} = require('../lib')

describe('Queue.constructor()', () => {
    it('with default arguments', () => {
        new Queue()
    })

    it('with an empty array', () => {
        new Queue([])
    })

    it('with a non-empty array', () => {
        new Queue([1, 2, 3])
    })

    it('with null', () => {
        assert.throws(() => {
            new Queue(null)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with true', () => {
        assert.throws(() => {
            new Queue(true)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with false', () => {
        assert.throws(() => {
            new Queue(false)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a number', () => {
        assert.throws(() => {
            new Queue(1)
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a string', () => {
        assert.throws(() => {
            new Queue("string")
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with an object', () => {
        assert.throws(() => {
            new Queue({})
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })

    it('with a function', () => {
        assert.throws(() => {
            new Queue(function () {})
        }, {
            name: 'TypeError',
            message: 'Items must be an array'
        })
    })
})

describe('Queue.size', () => {
    it('with empty queue', () => {
        let q = new Queue()

        assert.equal(q.size, 0)
    })

    it('with non-empty queue', () => {
        let q = new Queue([1, 2, 3])

        assert.equal(q.size, 3)
    })
})

describe('Queue.push()', () => {
    it('with undefined', () => {
        let q = new Queue()

        q.push(undefined)
    })

    it('with null', () => {
        let q = new Queue()

        q.push(null)
    })

    it('with true', () => {
        let q = new Queue()

        q.push(true)
    })

    it('with false', () => {
        let q = new Queue()

        q.push(false)
    })

    it('with a number', () => {
        let q = new Queue()

        q.push(4)
    })

    it('with a string', () => {
        let q = new Queue()

        q.push('this is a string')
    })

    it('with an array', () => {
        let q = new Queue()

        q.push([1, 2, 3])
    })

    it('with an object', () => {
        let q = new Queue()

        q.push({})
    })

    it('with a function', () => {
        let q = new Queue()

        q.push(function() {})
    })
})

describe('Queue.pop()', () => {
    it('with empty queue', () => {
        let q = new Queue()

        assert.throws(() => {
            q.pop()
        }, {
            name: 'NotFound',
            message: 'Queue is empty'
        })
    })

    it('with non-empty queue', () => {
        let q = new Queue([1, 2, 3])

        for (let i = 1; i <= 3; ++i) {
            let item = q.pop()
            assert.equal(item, i)
        }
    })
})

describe('Queue.front()', () => {
    it('with empty queue', () => {
        let q = new Queue()

        assert.throws(() => {
            q.front()
        }, {
            name: 'NotFound',
            message: 'Queue is empty'
        })
    })

    it('with non-empty queue', () => {
        let q = new Queue([1, 2, 3])
        let item = q.front()

        assert.equal(item, 1)
    })
})

describe('Queue.clear()', () => {
    it('with empty queue', () => {
        let q = new Queue()

        q.clear()
        assert.equal(q.size, 0)
    })

    it('with non-empty queue', () => {
        let q = new Queue([1, 2, 3])

        q.clear()
        assert.equal(q.size, 0)
    })
})
