export function memoize(func: (...arg: any) => any) {
  if (typeof func !== "function") {
    throw new Error("Function to be memoized must be a function.");
  }

  const cache = new Map();

  return (...args: any) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}
