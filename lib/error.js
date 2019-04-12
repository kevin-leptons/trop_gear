class NotImplementError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class NotExistedError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class ExistedError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = {
    NotImplementError,
    NotExistedError,
    ExistedError
}
