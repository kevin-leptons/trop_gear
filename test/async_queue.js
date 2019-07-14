const assert = require('assert')

const {wait_forever_pseudo} = require('./lib')
const {error, AsyncQueue} = require('../lib')

describe('AsyncQueue.constructor()', () => {
    it('do not specific input', () => {
        new AsyncQueue()
    })

    it('specific items=[]', () => {
        new AsyncQueue([])
    })

    it('specific items=[1, 2, 3]', () => {
        new AsyncQueue([1, 2, 3])
    })

    it('specific items=[], capacity=3', () => {
        new AsyncQueue([], 3)
    })

    it('specific items=1', () => {
        assert.throws(() => {
            new AsyncQueue(1)
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items="string"', () => {
        assert.throws(() => {
            new AsyncQueue("string")
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items=function() {}', () => {
        assert.throws(() => {
            new AsyncQueue(function () {})
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items={}', () => {
        assert.throws(() => {
            new AsyncQueue({})
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items=null', () => {
        assert.throws(() => {
            new AsyncQueue(null)
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items=true', () => {
        assert.throws(() => {
            new AsyncQueue(true)
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific items=false', () => {
        assert.throws(() => {
            new AsyncQueue(false)
        }, {
            name: 'TypeError',
            message: 'Items must be an Array<any>'
        })
    })

    it('specific capacity less than number of items', () => {
        assert.throws(() => {
            new AsyncQueue([1, 2, 3], 2)
        }, {
            name: 'RangeError',
            message: 'Number of items is greater than capacity'
        })
    })

    it('initialization array does not affects to queue', () => {
        let init_arr = [1, 2, 3]
        let q = new AsyncQueue(init_arr)

        init_arr.push(4)
        assert.equal(q.size, 3)
    })
})

describe('AsyncQueue.size', () => {
    it('with items=undefined, return 0', () => {
        let q = new AsyncQueue()
        assert.equal(q.size, 0)
    })

    it('with items=[1, 2, 3], return 3', () => {
        let q = new AsyncQueue([1, 2, 3])
        assert.equal(q.size, 3)
    })
})

describe('AsyncQueue.capacity', () => {
    it('default capacity, return 8', () => {
        let q = new AsyncQueue()
        assert.equal(q.capacity, 8)
    })

    it('custom capacity, return specific value', () => {
        let q = new AsyncQueue([], 10)
        assert.equal(q.capacity, 10)
    })
})

describe('AsyncQueue.push()', () => {
    it('with empty queue, return immediately', async () => {
        let q = new AsyncQueue([], 8)

        let t1 = async () => {
            await q.push(1)
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let r = await Promise.race([t1(), t2()])
        let return_immediately = r === 1

        assert(return_immediately)
        assert.equal(q.size, 1)
    })

    it('with not full queue, return immediately', async () => {
        let q = new AsyncQueue([1, 2], 3)

        let t1 = async () => {
            await q.push(1)
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let r = await Promise.race([t1(), t2()])
        let return_immediately = r === 1

        assert(return_immediately)
        assert.equal(q.size, 3)
    })

    it('with empty queue, push until it is full', async() => {
        let q = new AsyncQueue()

        for (; q.size < q.capacity;) {
            await q.push(1)
        }
    })

    it('with not full queue, push util it is full', async () => {
        let q = new AsyncQueue([1, 2, 3], 8)

        for (; q.size < q.capacity;) {
            await q.push(1)
        }
    })

    it('with full queue, first request must be waiting', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)

        let t1 = async () => {
            await q.push(4)
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let r = await Promise.race([t1(), t2()])
        let request_blocked = r === 2

        assert(request_blocked)
        assert.equal(q.size, 3)
    })

    it('with full queue, second request will be reject', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)

        let t1 = async () => {
            await q.push(4)
            return 1
        }
        let t2 = async () => {
            try {
                await q.push(5)
            } catch (e) {
                if (e instanceof error.Conflict) {
                    return 2
                }
            }
            return 3
        }
        let r = await Promise.race([t1(), t2()])
        let rejected = r === 2

        assert(rejected)
        assert.equal(q.size, 3)
    })

    it('with full queue, pop causes return of push', async () => {
        let q = new AsyncQueue([1, 2, 3])

        let t1 = async () => {
            await q.push(4)
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let t3 = Promise.race([t1(), t2()])
        let t4 = async () => {
            return await q.pop()
        }
        let [r1, r2] = await Promise.all([t3, t4()])
        let triggered = r1 === 1

        assert(triggered)
        assert.equal(r2, 1)
    })

    it('does not affects to initialization array', async () => {
        let init_arr = [1, 2, 3]
        let q = new AsyncQueue(init_arr)

        await q.push(4)
        assert.equal(init_arr.length, 3)
    })
})

describe('AsyncQueue.pop()', () => {
    it('with non empty queue, return immediately', async () => {
        let q = new AsyncQueue([1, 2, 3])

        let item = await q.pop()
        assert.equal(item, 1)
        assert.equal(q.size, 2)
    })

    it('with non empty queue, pop until it is empty', async () => {
        let q = new AsyncQueue([1, 2, 3])

        for (; q.size > 0;) {
            await q.pop()
        }
    })

    it('with full queue, pop util it is empty', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)

        for (; q.size < q.capacity;) {
            await q.pop(1)
        }
    })

    it('with full queue, return immediately', async() => {
        let q = new AsyncQueue([1, 2, 3], 3)

        let item = await q.pop()
        assert.equal(item, 1)
        assert.equal(q.size, 2)
    })

    it('with empty queue, wait forever', async () => {
        let q = new AsyncQueue()

        let t1 = async () => {
            await q.pop()
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let r = await Promise.race([t1(), t2()])
        let pop_never_return = r === 2

        assert(pop_never_return)
    })

    it('with empty queue, push an item cause return of pop', async () => {
        let q = new AsyncQueue()

        let t1 = async () => {
            return await q.pop()
        }
        let t2 = async() => {
            await wait_forever_pseudo()
            return 2
        }
        let t3 = Promise.race([t1(), t2()])
        let t4 = async() => {
            await q.push(1)
        }
        let [r1, r2] = await Promise.all([t3, t4()])
        let push_trigger_waiting_on_pop = r1 === 1

        assert(push_trigger_waiting_on_pop)
    })

    it('does not affects to initialization array', async () => {
        let init_arr = [1, 2, 3]
        let q = new AsyncQueue(init_arr)

        await q.pop()
        assert.equal(init_arr.length, 3)
    })
})

describe('AsyncQueue.close()', () => {
    it('with no waiting on push or pop', async () => {
        let q = new AsyncQueue()
        await q.close()
    })

    it('with full queue, waiting on push, no waiting on pop', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)

        let t1 = async () => {
            try {
                await q.push(4)
            } catch (e) {
                if (e instanceof error.Closed) {
                    return 1
                }
            }

            return 2
        }
        let t2 = async () => {
            await q.close()
        }
        let [r1, r2] = await Promise.all([t1(), t2()])
        let rejected = r1 === 1

        assert(rejected)
    })

    it('with empty queue, waiting on pop, no waiting on push', async () => {
        let q = new AsyncQueue([], 3)

        let t1 = async () => {
            try {
                await q.pop()
            } catch (e) {
                if (e instanceof error.Closed) {
                    return 1
                }
            }

            return 2
        }
        let t2 = async () => {
            await q.close()
        }
        let [r1, r2] = await Promise.all([t1(), t2()])
        let rejected = r1 === 1

        assert(rejected)
    })

    it('with empty queue, closed, can not push', async () => {
        let q = new AsyncQueue()
        await q.close()

        await assert.rejects(async () => {
            await q.push(1)
        }, {
            name: 'Closed',
            message: 'Can not perform operations on closed queue'
        })
    })

    it('with full queue, closed, can not push', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)
        await q.close()

        await assert.rejects(async () => {
            await q.push(1)
        }, {
            name: 'Closed',
            message: 'Can not perform operations on closed queue'
        })
    })

    it('with empty queue, closed, can not pop', async () => {
        let q = new AsyncQueue()
        await q.close()

        await assert.rejects(async () => {
            await q.pop()
        }, {
            name: 'Closed',
            message: 'Can not perform operations on closed queue'
        })
    })

    it('with full queue, closed, can not pop', async () => {
        let q = new AsyncQueue([1, 2, 3], 3)
        await q.close()

        await assert.rejects(async () => {
            await q.pop()
        }, {
            name: 'Closed',
            message: 'Can not perform operations on closed queue'
        })
    })
})

describe('AsyncQueue.-performance', () => {
    async function test_performace_with(item) {
        let q = new AsyncQueue()
        let t1 = async () => {
            for (let i = 0; i <= 10000000; ++i) {
                await q.push(item)
            }
            await q.push(null)
        }
        let t2 = async () => {
            for (;;) {
                let item = await q.pop()
                if (item === null) {
                    return
                }
            }
        }
        let start = Date.now()
        await Promise.all([t1(), t2()])
        let end = Date.now()
        let timelapse = Math.round((end - start) / 1000)

        assert(timelapse <= 6)
    }

    it('push and pop 10 milion numbers', async () => {
        await test_performace_with(1)
    })

    it('push and pop 10 milion strings', async () => {
        await test_performace_with('this is a string')
    })

    it('push and pop 10 milion array', async () => {
        await test_performace_with([1, 2, 3])
    })

    it('push and pop 10 milion objects', async () => {
        await test_performace_with({})
    })

    it('push and pop 10 milion boolean', async () => {
        await test_performace_with(true)
    })
})
