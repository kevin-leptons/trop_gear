const assert = require('assert')
const Ajv = require('ajv')

const {error} = require('../lib')

describe('error.error_chain', () => {
    it('error.error_chain.constructor', () => {
        let prev_error = Error('This is previous error')
        new error.ErrorChain('This is an error', prev_error)
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

// private members

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
    let e2 = new error.ErrorChain('This is second error', e1)
    let e3 = new error.ErrorChain('This is third error', e2)

    return e3
}
