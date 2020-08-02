export default (asyncFunc, { transformRes = true } = {}) => {
  let promise;
  let wrappedFunc = async (...args) => {
    let res, err;
    promise = asyncFunc(...args);
    while (true) {
      let pending = promise;
      try { await pending; } catch {}
      if (pending !== promise) continue;
      
      try {
        res = await pending;
      } catch (_err) {
        err = _err;
      }
      if (transformRes) return [res, err];
      if (err) throw err;
      return res;
    }
  };
  return wrappedFunc;
};
