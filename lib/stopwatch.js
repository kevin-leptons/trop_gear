class Stopwatch {
    // Description
    // * Set start time
    //
    // Input - none
    //
    // Output -  none
    start() {
        this._start_time = Date.now()
    }

    // Description
    // * Set finished time
    //
    // Input - none
    //
    // Output - none
    stop() {
        this._elapsed = Date.now() - this._start_time
    }

    // Number
    // Non-negative float, elapsed time by miliseconds
    get elapsed() {
        return this._elapsed
    }
}

module.exports = Stopwatch
