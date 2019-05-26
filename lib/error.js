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
    NotImplemented,
    NotFound,
    Conflict,
    InfiniteLoop,
    Closed,
    Capacity
}
