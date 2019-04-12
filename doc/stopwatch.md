## Stopwatch

Measure elapsed time

```js
const {Stopwatch} = require('@trop/gear')
```

## get elapsed()

`Number` - Non-negative float, elapsed time by miliseconds

## start()

* Description
    * Set start time
* Input - none
* Output -  none

## stop()

* Description
    * Set finished time
* Input - none
* Output - none

## Example

```js
const {Stopwatch, delay} = require('@trop/gear')

async function measure_time() {
    let sw = new Stopwatch()

    sw.start()
    await delay(1000)
    sw.stop()

    console.log(`Elapsed time ${sw.elapsed}`);
}

measure_time().
catch(e => console.error(e))
```
