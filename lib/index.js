const cachePromise = (fn, { ttl } = { ttl: 60 * 1000 }) => {
  const isExpired = () => {
    return (cacheStore.lastCachedAt.getTime() + ttl) < new Date().getTime();
  };

  const reset = () => {
    cacheStore.lastCachedAt = new Date(0);
  };

  const cachedFn = () => {
    if (cacheStore.data && !cacheStore.isExpired()) {
      return Promise.resolve(cacheStore.data);
    }

    return cacheStore.fn()
      .then((data) => {
        cacheStore.data = data;
        cacheStore.lastCachedAt = new Date();
        return data;
      });
  };

  const cacheStore = {
    ttl,
    fn,
    data: null,
    isExpired,
    lastCachedAt: new Date(0)
  };

  return {
    cachedFn,
    reset
  };
};

module.exports = { cachePromise };