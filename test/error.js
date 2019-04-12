const assert = require('assert')

const {error} = require('../lib')

_test_error_class(error.NotImplemented)
_test_error_class(error.NotFound)
_test_error_class(error.Conflict)
_test_error_class(error.InfiniteLoop)
_test_error_class(error.Capacity)

// PRIVATE MEMBERS

function _test_error_class(type) {
    let sample = new type()

    describe(`error.${sample.constructor.name}`, () => {
        it('extends from Error', () => {
            assert(type.prototype instanceof Error)
        })

        it('constructor() with empty message', () => {
            new type()
        })

        it('has correct name', () => {
            let e = new type()

            assert.equal(e.name, e.constructor.name)
        })

        it('has correct message', () => {
            let message = 'this is short description'
            let e = new type(message)

            assert.equal(e.message, message)
        })

        it('throw an instance', () => {
            let message = 'some thing went wrong'
            let e = new type(message)
            assert.throws(() => {
                throw e
            }, {
                name: e.constructor.name,
                message: message
            })
        })
    })
}
