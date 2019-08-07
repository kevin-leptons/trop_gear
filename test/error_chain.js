const assert = require('assert')

const {error} = require('../lib')

describe('error.error_chain', () => {
    it('error.error_chain.constructor', () => {
        let prev_error = Error('This is previous error')
        new error.ErrorChain('This is an error', prev_error)
    })

    it('error.error_chain.get_chain', () => {
        let e = _create_error_chain()
        let chain = e.chain

        assert.equal(Array.isArray(chain), true)
        assert.equal(chain.length, 3)
        assert.equal(chain[0].message, 'This is third error')
        assert.equal(chain[1].message, 'This is second error')
        assert.equal(chain[2].message, 'This is first error')
    })

    it('error.error_chain.get_printable_chain', () => {
        let e = _create_error_chain()
        let chain = e.printable_chain

        assert.equal(Array.isArray(chain), true)
        assert.equal(chain.length, 3)
        assert.equal(typeof chain[0], 'string')
        assert.equal(typeof chain[1], 'string')
        assert.equal(typeof chain[2], 'string')
    })
})

// private members

function _create_error_chain() {
    let e1 = Error('This is first error')
    let e2 = new error.ErrorChain('This is second error', e1)
    let e3 = new error.ErrorChain('This is third error', e2)

    return e3
}
