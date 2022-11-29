const throttle = (
  fn,
  interval,
  options = { leading: true, trailing: false }
) => {
  const { leading, trailing } = options;
  let isFirstInvoke = false;
  let isLastInvoke = false;
  let timer = null;
  let _this = null;
  let _args = null;

  const _fn = function (...args) {
    _this = this;
    _args = args;

    // 有定时器，表明还在冻结期，不执行函数。
    if (timer) {
      return;
    } else {
      // 第一次还未执行且不需要执行
      if (!leading && !isFirstInvoke) {
        timer = setTimeout(() => {
          timer = null;
          if (trailing) {
            fn.apply(_this, _args);
          }
        }, interval);
        isFirstInvoke = true;
        return;
      }
      // 无定时器，执行函数，并添加定时器。
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, interval);
    }
  };

  return _fn;
};

export default throttle;
export { throttle };
