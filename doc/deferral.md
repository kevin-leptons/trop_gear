# Deferral

A way to finish a promise later, outside of promise constructor.

```js
const {Deferral} = require('@trop/gear')
```

## Deferral()

* Description
    * Create an instance of deferral
* Input - none

## get promise()

* Description
    * Retrieve instance of Promise which correspond with deferral
* Input - none
* Output
    * `Promise<any>`

## resolve(result)

* Description
    * Finish deferral as successful
* Input
    * `result` / `any` - Data as result of deferral
* Output - none

## reject(error)

* Description
    * Finish deferral as failure
* Input
    * `error` / `any` - Data as error of deferral
* Output - none

## Example

```js
const http = require('http')
const {Deferral} = require('@trop/gear')

async function hello_google() {
    let defer = new Deferral()

    http.get('http://google.com', res => {
        let data

        res.on('data', chunk => {
            data += chunk
        })
        res.on('end', () => {
            defer.resolve(data)
        })
        res.on('error', err => {
            defer.reject(err)
        })
    })

    return defer.promise
}
```
