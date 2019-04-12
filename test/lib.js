const {delay} = require('../lib')

async function wait_forever_pseudo(time=3000) {
    await delay(time)
}

module.exports = {
    wait_forever_pseudo
}
