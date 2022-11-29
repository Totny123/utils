function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue) {
  // Set类型
  if (originValue instanceof Set) {
    const newSet = new Set();
    originValue.forEach((value) => {
      newSet.add(deepClone(value));
    });
    return newSet;
  }
  // Map类型
  if (originValue instanceof Map) {
    const newMap = new Map();
    originValue.forEach((value, key) => {
      newMap.set(deepClone(key), deepClone(value));
    });
    return newMap;
  }
  // Symbol类型
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }
  // 函数
  if (typeof originValue === "function") {
    return originValue;
  }
  // 非对象
  if (!isObject(originValue)) {
    return originValue;
  }
  // 普通对象和数组
  const newObj = Array.isArray(originValue) ? [] : {};
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key]);
  }
  // 处理key为Symbol类型的属性
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const skey of symbolKeys) {
    const newKey = Symbol(skey.description);
    newObj[newKey] = deepClone(originValue[skey]);
  }
  return newObj;
}

// #region tip: 测试代码
let s1 = Symbol("s1s1s1");
let s2 = Symbol("s2s2s2");
let a = { test: "feng" };
const obj = {
  name: "feng",
  address: {
    city: "广州",
    arr: [123, 89, [1, 2, 3]],
  },
  foo: function () {
    console.log("foo");
  },
  [s1]: "s1s1s1",
  s2: s2,
  set: new Set([1, 2, 3, a]),
  map: new Map([[a, a]]),
};

const newObj = deepClone(obj);
console.log(obj);
console.log(newObj);
// #endregion
