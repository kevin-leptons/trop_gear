class ErrorChain extends Error {
    // Description
    // * Create chain of errors
    //
    // Input
    // * message / String - Short, simple and clear description about error
    // * prev_error / Error - Instance of error, that error occurs before this
    //   error
    // * context / Any - Additional data describes how error occurs
    constructor(message, prev_error=undefined, context=undefined) {
        super(message)
        this.name = this.constructor.name
        this.prev_error = prev_error
        this.context = context
    }

    // Description
    // * Retrieve chain of errors
    //
    // Input - none
    //
    // Output - Array<Error>
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

    // Description
    // * Retrieve chain of errors in serializale data format
    //
    // Input - none
    //
    // Output - Array<Object>
    // * name / String
    // * message / String
    // * stack / Array<String>
    // * context / Any
    get chain() {
        let items = this.origin_chain.map(e => {
            let lines = e.stack.split('\n')
            let lines_without_error_name = lines.splice(1)
            let trimed_lines = lines_without_error_name.map(s => s.trim())

            return {
                name: e.name,
                message: e.message,
                stack: trimed_lines,
                context: e.context
            }
        })
        return items
    }
}

class NotImplemented extends Error {
    // Description
    // * A feature is not implements yet
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class NotFound extends Error {
    // Description
    // * A resource is not existed
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class Conflict extends Error {
    // Description
    // * A resource is already existed
    // * An action can not perform because of affected resources are
    //   in relationship with others
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class InfiniteLoop extends Error {
    // Description
    // * Pre condition causes infinite operations
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class Closed extends Error {
    // Description
    // * Some object provide life-time mechanism to terminate waiting on it.
    //   If that object is change to CLOSED state, it does not allows
    //   perform actions anymore.
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class Capacity extends Error {
    // Description
    // * Some data structure has it's limitation about capacity. Push more
    //   data to that structure cause an error because it can not hold more
    //   than it's capacity
    //
    // Input
    // * message / any / '' - Short description about error
    constructor(message) {
        super(message)
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
