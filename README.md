# Promise Cache

### Usage
```javascript
const { cachePromise } = require('promise-cache-fn');

const main = async (args) => {
  const promiseFn = Promise.resolve();

  const { cachedFn, reset } = cachePromise(promiseFn, { ttl: 1000 * 60 }); // cache the promise for a minute

  const response = await cacheFn(args);

  // conditional reset cache
  if (!response) {
    reset(); // reset cache
  }
}
```