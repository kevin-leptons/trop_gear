# Delay

```js
const {delay} = require('@trop/gear')
```

## delay(miliseconds)

* Description
    * Asynchronous waiting
* Input
    * `time_span` / `Number` - Non-negative integer, number of miliseconds
       for waiting
* Output
    * `Promise<undefined>`

## Example

```js
const {delay} = require('@trop/gear')

async function main() {
    await delay(3000)
    console.log('3 seconds has elapsed')
}

main().
catch(e => console.error(e))
```
