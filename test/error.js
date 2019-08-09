const assert = require('assert')
const Ajv = require('ajv')

const {
    ErrorChain,
    NotImplemented,
    NotFound,
    Conflict,
    InfiniteLoop,
    Capacity
} = require('../lib').error

describe('error.error_chain', () => {
    it('error.error_chain.constructor', () => {
        let prev_error = Error('This is previous error')
        new ErrorChain('This is an error', prev_error)
    })

    it('error.error_chain.get_name', () => {
        let e = new ErrorChain()
        assert.equal(e.name, 'ErrorChain')
    })

    it('error.error_chain.get_message', () => {
        let message = 'Oops!, bad thing happens'
        let e = new ErrorChain(message)

        assert.equal(e.message, message)
    })

    it('error.error_chain.get_previous_error', () => {
        let prev_error = Error('Oops!')
        let e = new ErrorChain('Bad thing', prev_error)

        assert.equal(e.prev_error, prev_error)
    })

    it('error.error_chain.get_context', () => {
        let context = {
            one: 1,
            two: 2
        }
        let e = new ErrorChain('Oops!', undefined, context)

        assert.equal(e.context, context)
    })

    it('error.error_chain.get_chain', () => {
        let e = _create_error_chain()
        _verify_schema(_ERROR_CHAIN_SCHEMA, e.chain)
    })

    it('error.error_chain.get_origin_chain', () => {
        let e = _create_error_chain()
        _verify_schema(_ORIGIN_ERROR_CHAIN_SCHEMA, e.origin_chain)
    })
})

_test_error_class(NotImplemented)
_test_error_class(NotFound)
_test_error_class(Conflict)
_test_error_class(InfiniteLoop)
_test_error_class(Capacity)

// PRIVATE MEMBERS

const _ERROR_CHAIN_SCHEMA = {
    type: 'array',
    items: {
        type: 'object',
        additionalProperties: false,
        required: [
            'name',
            'message',
            'stack'
        ],
        properties: {
            name: {
                type: 'string'
            },
            message: {
                type: 'string'
            },
            stack: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            context: {}
        }
    }
}

const _ORIGIN_ERROR_CHAIN_SCHEMA = {
    type: 'array',
    items: {
        type: 'object',
        required: [
            'name',
            'message',
            'stack'
        ],
        properties: {
            name: {
                type: 'string'
            },
            message: {
                type: 'string'
            },
            stack: {
                type: 'string'
            }
        }
    }
}

function _verify_schema(schema, data) {
    let ajv = new Ajv()
    let valid = ajv.validate(schema, data)

    if (!valid) {
        throw Error(JSON.stringify(ajv.errors, null, 2))
    }
}

function _create_error_chain() {
    let e1 = Error('This is first error')
    let e2 = new ErrorChain('This is second error', e1)
    let e3 = new ErrorChain('This is third error', e2)

    return e3
}

function _test_error_class(type) {
    let sample = new type()

    describe(`error.${sample.constructor.name}`, () => {
        it('extends from ErrorChain', () => {
            assert(type.prototype instanceof ErrorChain)
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

        it('has correct previous error', () => {
            let e0 = Error('e0 occured')
            let e1 = new type('e0 causes e1', e0)

            assert.equal(e1.prev_error, e0)
        })

        it('has correct error context', () => {
            let context = {
                one: 1,
                two: 2
            }
            let e = new type('Oops!', undefined, context)

            assert.equal(e.context, context)
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
