class Deferral {
    // Description
    // * A way to finish a promise later, outside of promise constructor
    //
    // Input - None
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })
    }

    // Promise<any>
    // Promise coresspond with deferral
    get promise() {
        return this._promise
    }

    // Description
    // * Finish deferral as successful
    //
    // Input
    // * res / any - Result of deferral
    //
    // Output - none
    resolve(res) {
        return this._resolve(res)
    }

    // Description
    // * Finish deferral as failure
    //
    // Input
    // * err / any - Error of defferal
    reject(err) {
        return this._reject(err)
    }
}

module.exports = Deferral
