const cachePromise = (fn, { ttl } = { ttl: 60 * 1000 }) => {
  const cacheStore = {
    ttl,
    fn,
    data: null,
    lastCachedAt: new Date(0)
  };

  const isExpired = () => {
    return (cacheStore.lastCachedAt.getTime() + ttl) < new Date().getTime();
  };

  const reset = () => {
    cacheStore.lastCachedAt = new Date(0);
  };

  const cachedFn = () => {
    if (cacheStore.data && !isExpired()) {
      return Promise.resolve(cacheStore.data);
    }

    return cacheStore.fn()
      .then((data) => {
        cacheStore.data = data;
        cacheStore.lastCachedAt = new Date();
        return data;
      });
  };

  return {
    cachedFn,
    reset
  };
};

module.exports = { cachePromise };
