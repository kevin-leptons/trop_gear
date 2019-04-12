const assert = require('assert')

const {Stopwatch, delay} = require('../lib')

describe('Stopwatch', () => {
    it('create, start then stop', async () => {
        let sw = new Stopwatch()

        let start = Date.now()
        sw.start()
        await delay(1000)
        sw.stop()
        let end = Date.now()
        let elapsed = end - start

        assert(elapsed - 5 <= sw.elapsed <= elapsed  + 5)
    })
})
