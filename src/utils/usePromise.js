import React from 'react';

let usePromise = (
  asyncFunc,
  initialState = {},
) => {
  let unmounted = React.useRef(false);
  let [state, _dispatch] = React.useReducer((state, [action, payload]) => {
    switch (action) {
      case 'START_CALL': return {
        ...state,
        loading: true,
        callCount: state.callCount + 1,
      };
      case 'CALL_ERROR': return {
        ...state,
        loading: false,
        error: payload,
      };
      case 'CALL_SUCCESS': return {
        ...state,
        loading: false,
        error: null,
        value: payload,
      };
      default: throw new Error();
    }
  }, {
    value: null,
    loading: false,
    error: null,
    callCount: 0,
    ...initialState
  });
  let dispatch = React.useCallback((...args) => {
    if (unmounted.current) return;
    _dispatch(...args);
  }, []);
  let promiseRef = React.useRef();
  let asyncFuncRef = React.useRef();
  asyncFuncRef.current = asyncFunc;

  // can call multiple time but only return latest result (previous calls will be ignored)
  // similar to redux saga takeLatest()
  // execAsyncFunc function identity is stable and won’t change on re-renders.
  let execAsyncFunc = React.useCallback((...args) => new Promise(resolve => {
    dispatch(['START_CALL']);
    let promise = (async () => {
      let error;
      let value;
      try {
        value = await asyncFuncRef.current(...args);
      } catch (err) {
        error = err;
      }
      
      let isLatestCall = promise === promiseRef.current;
      if (error !== undefined) {
        isLatestCall && dispatch(['CALL_ERROR', error]);
        console.warn('react-common/usePromise call error:', error);

        let res = [undefined, error];
        res.error = error; // backwards compat versions <= v2.4.4
        resolve(res);
      } else {
        isLatestCall && dispatch(['CALL_SUCCESS', value]);

        let res = [value, undefined];
        res.value = value; // backwards compat versions <= v2.4.4
        resolve(res);
      }
    })();
    promiseRef.current = promise;
  }), [dispatch]);

  React.useEffect(
    () => () => unmounted.current = true,
    []
  );

  return [state, execAsyncFunc];
};

export default usePromise;
