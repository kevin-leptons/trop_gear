// Description
// * Asynchronous waiting
//
// Input
// * time_span / Number - Non-negative integer, number of miliseconds
//   for waiting
//
// Output
// * Promise<undefined>
async function delay(time_span) {
    return new Promise((resolve) => {
        setTimeout(resolve, time_span)
    })
}

module.exports = delay
