# Promise Cache

### Usage
```javascript
const { cachePromise } = require('promise-cache-fn');

const promiseFn = () => Promise.resolve();

const { cachedFn, reset } = cachePromise(promiseFn, { ttl: 1000 * 60 }); // cache the promise for a minute

const main = async (args) => {
  const response = await cachedFn(args);

  // conditional reset cache
  if (!response) {
    reset(); // reset cache
  }
}
```