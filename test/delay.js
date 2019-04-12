const assert = require('assert')

const {delay} = require('../lib')

describe('delay()', () => {
    it('with 0 miliseconds', async () => {
        let start = Date.now()
        await delay(0)
        let end = Date.now()

        assert(end - start < 5)
    })

    it('with 5 miliseconds', async () => {
        let start = Date.now()
        await delay(5)
        let end = Date.now()

        assert(end - start < 10)
    })

    it('with 1 second', async () => {
        let start = Date.now()
        await delay(1000)
        let end = Date.now()

        assert(end - start < 1005)
    })

    it('with 3 seconds', async () => {
        let start = Date.now()
        await delay(3000)
        let end = Date.now()

        assert(end - start < 3005)
    })
})
