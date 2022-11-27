const debounce = (fn, delay, immediate, resultCallback) => {
  // 使用闭包保存变量。
  let timer = null;
  // 第一次执行的函数是否执行过
  let isInvoke = false;
  // 对原函数包装成一个新函数，并return出去。
  // 新函数为实际被回调的函数。
  const _fn = function (...args) {
    return new Promise((resolve, reject) => {
      // 是否立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args);
        resultCallback && resultCallback(result);
        resolve(result);
        isInvoke = true;
      } else {
        // 清除上一次的定时器。
        if (timer) clearTimeout(timer);
        // 定时器的函数要用箭头函数，才能获取外层的this。
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          resultCallback && resultCallback(result);
          resolve(result);
          // 手动设置为初始状态
          timer = null;
          isInvoke = false;
        }, delay);
      }
    });
  };

  // 添加取消功能
  _fn.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };

  return _fn;
};

export default debounce;
export { debounce };
