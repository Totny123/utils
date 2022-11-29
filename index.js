import { debounce } from "./debounce.js";
import { throttle } from "./throttle.js";

const inputEl = document.querySelector("input");
const btnEl = document.querySelector("button");

let times = 0;
function inputHandle(event) {
  times++;
  console.log(`第${times}次打印`);
  console.log("this是：", this);
  console.log("事件对象是：", event);
  return "abc";
}

// #region tip: debounce

// 包装后的新函数
// const fn = debounce(inputHandle, 2000, false, (res) => {
//   console.log("回调拿到的返回值：", res);
// });

// inputEl.addEventListener("input", function (...args) {
//   fn.apply(this, args).then((res) => {
//     console.log("promise拿到的返回值：", res);
//   });
// });
// btnEl.addEventListener("click", fn.cancel);
// #endregion

// #region tip: throttle
const foo = throttle(inputHandle, 1000, { leading: true, trailing: true });

inputEl.addEventListener("input", foo);

// #endregion
