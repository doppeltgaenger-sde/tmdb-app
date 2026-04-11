const cache = new Map();

export const getColorFromCache = (key) => {
  return cache.get(key);
};

export const setColorToCache = (key, value) => {
  cache.set(key, value);
};
