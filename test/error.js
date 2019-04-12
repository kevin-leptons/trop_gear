const assert = require('assert')

const {error} = require('../lib')

describe('error.NotImplementError', () => {
    it('extends from Error', () => {
        let e = new error.NotImplementError()

        assert(e instanceof Error)
    })

    it('constructor()', () => {
        new error.NotImplementError()
    })

    it('name is "NotImplementError"', () => {
        let e = new error.NotImplementError()

        assert.equal(e.name, 'NotImplementError')
    })

    it('message is correct', () => {
        let message = 'this is tiny message'
        let e = new error.NotImplementError(message)

        assert.equal(e.message, message)
    })

    it('throw an instance', () => {
        assert.throws(() => {
            throw new error.NotImplementError('some thing went wrong')
        }, error.NotImplementError)
    })
})
