const debounce = (fn, delay) => {
  // 使用闭包保存变量。
  let timer = null;
  // 对原函数包装成一个新函数，并return出去。
  // 新函数为实际被回调的函数。
  return function (...args) {
    // 清除上一次的定时器。
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      // 手动设置为null
      timer = null;
    }, delay);
  };
};

export default debounce;
export { debounce };
