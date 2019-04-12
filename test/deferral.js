const assert = require('assert')

const {Deferral} = require('../lib')
const {wait_forever_pseudo} = require('./lib')

describe('Deferral', () => {
    it('create then resolve', async () => {
        let defer = new Deferral()
        let t1 = async () => {
            return await defer.promise
        }
        let t2 = async () => {
            defer.resolve(1)
        }
        let [r1,  r2] = await Promise.all([t1() , t2()])
        let is_resolved = r1 === 1

        assert(is_resolved)
    })

    it('create then reject', async () => {
        let defer = new Deferral()
        let t1 = async () => {
            try {
                return await defer.promise
            } catch (e) {
                return e
            }
            return 0
        }
        let t2 = async () => {
            defer.reject(1)
        }
        let [r1,  r2] = await Promise.all([t1() , t2()])
        let is_rejected = r1 === 1

        assert(is_rejected)
    })

    it('create then do nothing', async () => {
        let defer = new Deferral()
        let t1 = async () => {
            await defer.promise
            return 1
        }
        let t2 = async () => {
            await wait_forever_pseudo()
            return 2
        }
        let r = await Promise.race([t1() , t2()])
        let is_block_forever = r === 2

        assert(is_block_forever)
    })
})
