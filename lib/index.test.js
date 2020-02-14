const Bluebird = require('bluebird');
const promise = jest.fn().mockImplementation(() => Promise.resolve('result'));
const { cachePromise } = require('./');

describe('cache-promise', () => {
  beforeEach(() => {
    promise.mockClear();
  });

  it('should only resolve promise once if cache is not expired', async () => {
    const { cachedFn } = cachePromise(promise, { ttl: 100000 });

    await cachedFn();
    await cachedFn();

    expect(promise.mock.calls.length).toEqual(1);
  });

  it('should resolve promise if cache is expired', async () => {
    const { cachedFn } = cachePromise(promise, { ttl: 1000 });

    await cachedFn();
    await Bluebird.delay(2000).then(() => cachedFn());

    expect(promise.mock.calls.length).toEqual(2);
  });

  it('should only resolve promise once for concurrent requests', async () => {
    const { cachedFn } = cachePromise(promise, { ttl: 100000 });

    await Promise.all([
      cachedFn(),
      cachedFn(),
      cachedFn()
    ]);

    expect(promise.mock.calls.length).toEqual(1);
  });
});
