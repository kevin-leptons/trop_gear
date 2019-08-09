class ErrorChain extends Error {
    // Description
    // * Create chain of errors
    //
    // Input
    // * message / String / undefined - Short, simple and clear description
    //   about error
    // * prev_error / Error / undefined - Instance of error, that error occurs
    //   before this error
    // * context / Any / undefined - Additional data describes how error
    //   occurs
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message)
        this.name = this.constructor.name
        this.prev_error = prev_error
        this.context = context
    }

    // Description
    // * Retrieve chain of errors in serializale data format
    //
    // Input - none
    //
    // Output - Array<Object>
    // * name / String
    // * message / String
    // * stack / Array<String>
    // * context / Any - Data describes how error occurs
    get chain() {
        let items = this.origin_chain.map(e => {
            return {
                name: e.name,
                message: e.message,
                stack: this._toStackArray(e.stack),
                context: e.context
            }
        })
        return items
    }

    _toStackArray(stackStr) {
        if (typeof stackStr !== 'string') {
            return []
        }

        let lines = stackStr.split('\n')
        let lines_without_error_name = lines.splice(1)
        let trimed_lines = lines_without_error_name.map(s => s.trim())

        return trimed_lines
    }

    // Description
    // * Retrieve chain of errors
    //
    // Input - none
    //
    // Output - Array<Error | Any>
    get origin_chain() {
        let e = this
        let chain = [e]

        for (;;) {
            e = e.prev_error
            if (e === undefined) {
                break
            }
            chain.push(e)
        }
        return chain
    }
}

class NotImplemented extends ErrorChain {
    // Description
    // * Describe a feature is not implements yet
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

class NotFound extends ErrorChain {
    // Description
    // * Describe a resource is not existed
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

class Conflict extends ErrorChain {
    // Description
    // * Describe an operation cant not be perform because it ``causes invalid
    //   relationship between objects.
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

class InfiniteLoop extends ErrorChain {
    // Description
    // * Describe an operation causes infinite operations
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

class Closed extends ErrorChain {
    // Description
    // * Describe an operation can not be perform because that function is
    //   not avaiable at that time.
    // * That situation occurs on objects which provides life-time mechanism.
    //   And at call time, it's life-time is ended.
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

class Capacity extends ErrorChain {
    // Description
    // * Describe an operation can not be perform because data storage is
    //   full
    //
    // Input
    // * message / any / undefined
    // * prev_error / Error / undefined
    // * context / Any / undefined
    constructor(message=undefined, prev_error=undefined, context=undefined) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

module.exports = {
    ErrorChain,
    NotImplemented,
    NotFound,
    Conflict,
    InfiniteLoop,
    Closed,
    Capacity
}
