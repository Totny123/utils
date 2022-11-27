import { debounce } from "./debounce.js";

const inputEl = document.querySelector("input");

let times = 0;
function inputHandle(event) {
  times++;
  console.log(`第${times}次打印`);
  console.log("this是：", this);
  console.log("事件对象是：", event);
}

// #region tip: debounce

// 包装后的新函数
const fn = debounce(inputHandle, 2000);

inputEl.addEventListener("input", fn);

// #endregion
