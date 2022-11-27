const throttle = (fn, interval) => {
  let timer = null;

  const _fn = function (...args) {
    // 有定时器，表明还在冻结期，不执行函数。
    if (timer) return;
    // 无定时器，执行函数，并添加定时器。
    fn.apply(this, args);
    timer = setTimeout(() => {
      timer = null;
    }, interval);
  };

  return _fn;
};

export default throttle;
export { throttle };
